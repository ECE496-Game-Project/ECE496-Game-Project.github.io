from django import forms
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError


class RegisterForm(forms.Form):
    username = forms.CharField(max_length=120)
    password1 = forms.CharField(widget=forms.PasswordInput, label="Password")
    password2 = forms.CharField(widget=forms.PasswordInput, label="Confirm Password")
    email = forms.EmailField(required=False)
    first_name = forms.CharField(max_length=120, label="First Name", required=False)
    last_name = forms.CharField(max_length=120, label="Last Name", required=False)

    def clean(self):
        cleaned_data = super().clean()

        password1 = cleaned_data.get('password1')
        password2 = cleaned_data.get('password2')
        username = cleaned_data.get('username')
        email = cleaned_data.get('email')

        # Check if passwords match
        if password1 and password2 and password1 != password2:
            raise ValidationError("The two password fields didn't match")

        # Check if username already exists
        if User.objects.filter(username=username).exists():
            raise ValidationError("A user with that username already exists")

        # Check if the password is at least 8 characters long
        if password1 and len(password1) < 8:
            raise ValidationError("This password is too short. It must contain at least 8 characters")

        if email and '@' not in email:
            raise ValidationError("Enter a valid email address")
