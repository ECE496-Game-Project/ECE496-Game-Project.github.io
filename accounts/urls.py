from django.urls import path, reverse_lazy
from .views import RegisterView, LoginView, ProfileView, ProfileEditView
from django.contrib.auth.views import LogoutView

app_name = 'accounts'

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(next_page=reverse_lazy('accounts:login')), name='logout'),
    path('profile/view/', ProfileView.as_view(), name='profile-view'),
    path('profile/edit/', ProfileEditView.as_view(), name='profile-edit'),
]

