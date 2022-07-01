from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Organization, Board, Ticket, Column
from rest_framework_simplejwt.tokens import RefreshToken


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username']

class UserSerializerWithToken(UserSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']

class OrganizationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organization
        fields = ['id', 'name', 'owner', 'members']

class BoardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Board
        fields = ['id', 'name', 'organization', 'prefix']

class ColumnSerializer(serializers.ModelSerializer):
    class Meta:
        model = Column
        fields = ['id', 'name', 'board', 'position']

class CreateOrUpdateColumnSerializer(serializers.ModelSerializer):
    class Meta:
        model = Column
        fields = ['name', 'board', 'position']

class TicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = ['id','title','description','board','repro_steps','acceptance_criteria','reporter','assignee','type','column', 'priority']

class CreateBoardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Board
        fields = ['id', 'name', 'organization', 'prefix']

class CreateTicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = ['title', 'description', 'board', 'repro_steps', 'acceptance_criteria', 'reporter', 'assignee', 'type', 'column','priority']
