from django.contrib import admin
from . import views
from django.urls import path, include

app_name = "scenes"

urlpatterns = [
    path('', views.SceneListView.as_view(), name='scene-list'),
]