from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Organization, Board, Ticket, Column, JoinRequest
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username']

class UserSerializerWithToken(UserSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']

class RegisterSerializer(serializers.ModelSerializer):
  username = serializers.CharField(
    required=True,
    validators=[UniqueValidator(queryset=User.objects.all())]
  )
  password = serializers.CharField(
    write_only=True, required=True, validators=[validate_password])
  password2 = serializers.CharField(write_only=True, required=True)
  class Meta:
    model = User
    fields = ('username', 'password', 'password2')

  def validate(self, attrs):
    if attrs['password'] != attrs['password2']:
      raise serializers.ValidationError(
        {"password": "Password fields didn't match."})
    return attrs
  def create(self, validated_data):
    user = User.objects.create(
      username=validated_data['username']
    )
    user.set_password(validated_data['password'])
    user.save()
    return user


class CreateOrganizationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organization
        fields = ['id', 'name']

class OrganizationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organization
        fields = ['id', 'name', 'owner', 'members', 'code']

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

class CreateColumnSerializer(serializers.ModelSerializer):
    class Meta:
        model = Column
        fields = ['name', 'board']

class JoinRequestSerializer(serializers.ModelSerializer):

  class Meta:
      model = JoinRequest
      fields = ['id', 'time', 'organization', 'requester', 'status']