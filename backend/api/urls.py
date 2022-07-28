from django.urls import path, include
from . import views
from .views import *
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    #Users
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterUserView.as_view()),

    #Jira
    path('organizations/', GetOrganizations.as_view()),
    path('create-organization/', CreateOrganizationView.as_view()),

    #Boards
    path('boards/', GetBoards.as_view()),
    path('board/<str:pk>/', GetBoard.as_view()), #! is this needed?
    path('board/<str:pk>/tickets/', GetTickets.as_view()),
    path('create-board/', CreateBoardView.as_view()),
    path('board/<str:pk>/update/', UpdateBoardView.as_view()),
    path('board/<str:pk>/delete/', DeleteBoardView.as_view()),

    #Columns
    path('column/<str:pk>/delete/', DeleteColumnView.as_view()),
    path('column/<str:pk>/update/', UpdateColumnView.as_view()),
    path('column/create/', CreateColumnView.as_view()),

    #Tickets
    path('create-ticket/', CreateTicketView.as_view()),
    path('ticket/<str:pk>/update/', UpdateTicket.as_view()),
    path('ticket/<str:pk>/delete/', DeleteTicketView.as_view()),

    #JoinRequests
    path('requests/<str:pk>/respond/', JoinRequestResponseView.as_view()),
    path('get-join-requests/', GetJoinRequestsView.as_view()),
]