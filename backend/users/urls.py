from . import views
from django.urls import path,include

urlpatterns = [
    path('api/auth/login', views.welcome, name="api/auth/login"),
    path('api/tickets/all', views.allticket, name="api/tickets/all"),
    path('api/tickets/delete/<int:id>/', views.delete_ticket, name="api/tickets/delete"),
     path('api/tickets/view/<int:id>/', views.view_ticket, name="api/tickets/view"),

]
