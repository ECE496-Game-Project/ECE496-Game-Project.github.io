from django import forms


class ContactForm(forms.Form):
    email = forms.EmailField(label="Your Email")
    sender = forms.CharField(max_length=120, label="Your Name")
    subject = forms.CharField(max_length=120, label="Topic")
    messages = forms.CharField(label="Your Message",
                               widget=forms.Textarea(attrs={'rows': 6, 'cols': 40}))