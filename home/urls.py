from . import views
from django.urls import path

app_name = "home"

urlpatterns = [
    path('', views.home, name='about'),
    path('contact/', views.ContactView.as_view(), name='contact'),
]