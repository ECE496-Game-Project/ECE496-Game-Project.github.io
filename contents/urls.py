from . import views
from django.urls import path

app_name = "contents"

urlpatterns = [
    path('tutorials/', views.TutorialListView.as_view(), name='tutorial-list'),
    path('scenes/', views.SceneListView.as_view(), name='scene-list'),
    path('unity/', views.UnityView.as_view(), name='unity'),
]

# <string: tutorial.__str__>/
