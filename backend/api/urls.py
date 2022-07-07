from django.urls import path, include
from . import views
from .views import GetOrganizations,GetBoard, GetTickets, GetBoards, UpdateTicket, CreateBoardView, UpdateBoardView, DeleteBoardView, CreateTicketView, DeleteTicketView, DeleteColumnView, CreateColumnView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    #Users
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh', TokenRefreshView.as_view(), name='token_refresh'),

    #Jira

    path('organizations/', GetOrganizations.as_view()),
    #Board Endpoints
    path('boards/', GetBoards.as_view()),
    path('board/<str:pk>/', GetBoard.as_view()), #! is this needed?
    path('board/<str:pk>/tickets/', GetTickets.as_view()),
    path('create-board/', CreateBoardView.as_view()),
    path('board/<str:pk>/update/', UpdateBoardView.as_view()),
    path('board/<str:pk>/delete/', DeleteBoardView.as_view()),
    #Column Endpoints
    path('column/<str:pk>/delete/', DeleteColumnView.as_view()),
    path('column/create/', CreateColumnView.as_view()),
    #Ticket Endpoints
    path('create-ticket/', CreateTicketView.as_view()),
    path('ticket/<str:pk>/update/', UpdateTicket.as_view()),
    path('ticket/<str:pk>/delete/', DeleteTicketView.as_view())
]