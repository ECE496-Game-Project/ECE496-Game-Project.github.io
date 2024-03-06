from django.urls import reverse_lazy
from django.shortcuts import render
from django.core.mail import send_mail
from django.views.generic.edit import FormView
from django.http import HttpResponseServerError
from .forms import contact_form


def home(request):
    return render(request, 'home/home.html')


class ContactView(FormView):
    template_name = 'home/contact.html'
    form_class = contact_form.ContactForm
    success_url = reverse_lazy('home:contact')

    def form_valid(self, form, **kwargs):
        email = form.cleaned_data['email']
        sender = form.cleaned_data['sender']
        subject = form.cleaned_data['subject']
        messages = form.cleaned_data['messages']

        message = f"From: {sender}\n\n{messages}"

        try:
            send_mail(
                subject,
                message,
                email,
                ['jackchen.chen@mail.utoronto.ca',
                 'zhangchuyue.zhang@mail.utoronto.ca',
                 'leo.hanxu@mail.utoronto.ca'],
                fail_silently=False,
            )
        except Exception as e:
            print(f"Error sending email: {e}")
            return HttpResponseServerError("Unable to send your message. Please fix errors then try again.")

        return super().form_valid(form)
