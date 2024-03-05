from django.views.generic.list import ListView
from .models import Tutorial, Section
from django.shortcuts import render
from django.views import View


class TutorialListView(ListView):
    model = Section
    template_name = 'tutorials/list.html'
    context_object_name = 'sections'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['tutorials'] = Tutorial.objects.all()
        return context


class TutorialView(View):
    template_name = 'tutorials/tutorial.html'

    def dispatch(self, request, *args, **kwargs):
        return render(request, self.template_name, *args, **kwargs)
