from . import views
from django.urls import path,include

urlpatterns = [
    path('api/auth/login', views.welcome, name="api/auth/login"),
    path('api/tickets/all', views.all_tickets, name="api/tickets/all"),
    path('api/tickets/delete/<int:id>/', views.delete_ticket, name="api/tickets/delete"),
    path('api/tickets/view/<int:id>/', views.view_ticket, name="api/tickets/view"),
    path('api/tickets/edit/<int:id>/', views.edit_ticket, name="api/tickets/edit"),
    path('api/tickets/create', views.create_ticket, name="api/tickets/create"),

]
