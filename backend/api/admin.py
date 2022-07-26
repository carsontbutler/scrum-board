from django.contrib import admin
from .models import Board, JoinRequest, Ticket, Column, Organization


admin.site.register(Board)
admin.site.register(Ticket)
admin.site.register(Column)
admin.site.register(Organization)
admin.site.register(JoinRequest)