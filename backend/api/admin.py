from django.contrib import admin
from .models import Board, Ticket, Column, Organization


admin.site.register(Board)
admin.site.register(Ticket)
admin.site.register(Column)
admin.site.register(Organization)