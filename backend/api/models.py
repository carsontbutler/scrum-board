from django.db import models
import string
import random
from django.contrib.auth.models import User

TICKET_TYPE_CHOICES = (
    ("Bug", "Bug"),
    ("Improvement", "Improvement"),
    ("Task", "Task")
)

TICKET_PRIORITY_CHOICES = (
    ("Low", "Low"),
    ("Medium", "Medium"),
    ("High", "High"),
    ("Highest", "Highest")
)


def generate_organization_code():
    length = 6
    while True:
        code = ''.join(random.choices(string.ascii_uppercase, k=length))
        if Organization.objects.filter(code=code).count() == 0:
            break
    return code

class Organization(models.Model):
    name = models.CharField(max_length=30, unique=True)
    owner = models.ForeignKey(User, related_name="organization_owner", on_delete=models.PROTECT) #!not sure about the protect
    code = models.CharField(max_length=8, default=generate_organization_code, unique=True)
    members = models.ManyToManyField(User, related_name="organization_members")

    def __str__(self):
        return self.name


class Board(models.Model):
    name = models.CharField(max_length=50)
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE)
    prefix = models.CharField(max_length=5, blank=False, default="BOARD")
    
    class Meta:
        unique_together = ['prefix','organization']

    def __str__(self):
        return self.name
    
class Column(models.Model):
    
    name = models.CharField(max_length=25)
    board = models.ForeignKey(Board, on_delete=models.CASCADE)
    position = models.PositiveIntegerField(default=0)

    class Meta:
        unique_together = ['board', 'position']

    def save(self, **kwargs):
        position_max_value = type(self).objects.filter(board=self.board).count()
        if self.position > position_max_value:
            raise ValueError("The max column value is " + str(position_max_value))
        super().save(**kwargs)

    def __str__(self):
        name_and_id = f"{self.name} ({self.id})"
        return name_and_id

class Ticket(models.Model):
    title = models.CharField(max_length=150)
    description = models.CharField(max_length=5000)
    board = models.ForeignKey(Board, on_delete=models.CASCADE)
    repro_steps = models.TextField(max_length=5000, blank=True)
    acceptance_criteria = models.TextField(max_length=500, blank=True)
    reporter = models.ForeignKey(User, on_delete=models.PROTECT, related_name="ticket_reporter")
    assignee = models.ForeignKey(User, on_delete=models.PROTECT, related_name="ticket_assignee", null=True, blank=True)
    type = models.CharField(max_length=20, choices=TICKET_TYPE_CHOICES, blank=False)
    column = models.ForeignKey(Column, on_delete=models.SET_NULL, null=True) #! might need to change later. Maybe protect instead?
    priority = models.CharField(max_length=20, choices=TICKET_PRIORITY_CHOICES, blank=False, default="medium")
    #created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class Comment(models.Model):
    ticket = models.ForeignKey(Ticket, on_delete=models.CASCADE) #! make sure this is right
    content = models.TextField(max_length=5000, blank=False)
    author = models.ForeignKey(User, on_delete=models.PROTECT)
    time = models.DateTimeField(auto_now_add=True)