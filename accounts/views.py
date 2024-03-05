from django.views.generic.edit import FormView
from django.urls import reverse_lazy
from django.shortcuts import redirect, render
from django.contrib import messages
from django.contrib.auth import authenticate, login, update_session_auth_hash
from django.contrib.auth.models import User
from .forms import register_form, login_form, profile_form
from django.http import JsonResponse, HttpResponse


class RegisterView(FormView):
    template_name = 'accounts/register.html'
    form_class = register_form.RegisterForm
    success_url = reverse_lazy('accounts:login')

    def form_valid(self, form, **kwargs):
        username = form.cleaned_data['username']
        password1 = form.cleaned_data['password1']
        email = form.cleaned_data['email']
        first_name = form.cleaned_data['first_name']
        last_name = form.cleaned_data['last_name']

        # Create the user
        user = User.objects.create_user(username, email, password1)
        user.first_name = first_name
        user.last_name = last_name
        user.save()

        messages.success(self.request, "User registered successfully")
        return super().form_valid(form)


class LoginView(FormView):
    form_class = login_form.LoginForm
    template_name = 'accounts/login.html'
    success_url = reverse_lazy('accounts:profile-view')

    def form_valid(self, form):
        username = form.cleaned_data['username']
        password = form.cleaned_data['password']
        user = authenticate(username=username, password=password)
        if user is not None:
            login(self.request, user)
            return redirect(self.success_url)


class ProfileView(FormView):
    def get(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return HttpResponse(status=401)

        user = request.user
        profile_data = {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name,
        }
        return JsonResponse(profile_data)


class ProfileEditView(FormView):
    form_class = profile_form.ProfileEditForm
    template_name = 'accounts/profile.html'
    success_url = reverse_lazy('accounts:profile-view')

    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return HttpResponse(status=401)
        return super().dispatch(request,*args,**kwargs)

    def get(self, request, *args, **kwargs):
        form = self.form_class(initial={
            'first_name': request.user.first_name,
            'last_name': request.user.last_name,
            'email': request.user.email,
        })
        return render(request, self.template_name, {'form': form})

    def form_valid(self, form, **kwargs):
        user = self.request.user

        password1 = form.cleaned_data['password1']
        email = form.cleaned_data['email']
        first_name = form.cleaned_data['first_name']
        last_name = form.cleaned_data['last_name']

        if 'password1' in form.cleaned_data and password1 != "":
            user.set_password(password1)

        if 'email' in form.cleaned_data:
            user.email = email

        if 'first_name' in form.cleaned_data:
            user.first_name = first_name

        if 'last_name' in form.cleaned_data:
            user.last_name = last_name

        user.save()
        update_session_auth_hash(self.request, user)
        return super().form_valid(form)
