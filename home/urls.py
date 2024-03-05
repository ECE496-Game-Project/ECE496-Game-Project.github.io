from django.contrib import admin
from . import views
from django.urls import path, include

app_name = "home"

urlpatterns = [
    path('', views.home, name='about'),
    path('contact/', views.contact, name='contact'),
]