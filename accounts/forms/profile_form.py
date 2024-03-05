from django import forms
from django.core.exceptions import ValidationError


class ProfileEditForm(forms.Form):
    password1 = forms.CharField(widget=forms.PasswordInput, label="New Password", required=False)
    password2 = forms.CharField(widget=forms.PasswordInput, label="Confirm New Password", required=False)
    email = forms.EmailField(label="Email", max_length=120, required=False)
    first_name = forms.CharField(label="First Name", max_length=120, required=False)
    last_name = forms.CharField(label="Last Name", max_length=120, required=False)

    def clean(self):
        cleaned_data = super().clean()

        password1 = cleaned_data.get('password1')
        password2 = cleaned_data.get('password2')
        email = cleaned_data.get('email')

        if password1 != "":
            if password1 != password2:
                raise ValidationError("The two password fields didn't match")
            else:
                if len(password1) < 8:
                    raise ValidationError('This password is too short. It must contain at least 8 characters')

        if email != "" and '@' not in email:
            raise ValidationError('Enter a valid email address.')
