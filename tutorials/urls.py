from django.contrib import admin
from . import views
from django.urls import path, include

app_name = "tutorials"

urlpatterns = [
    path('', views.TutorialListView.as_view(), name='tutorial-list'),
    path('tutorial/', views.TutorialView.as_view(), name='tutorial'),
]