from django.views.generic.list import ListView
from .models import Tutorial, Section, UserScene
from django.shortcuts import render
from django.http import HttpResponse
from django.views import View


class UnityView(View):
    template_name = 'contents/unity.html'

    def dispatch(self, request, *args, **kwargs):
        return render(request, self.template_name, *args, **kwargs)


class TutorialListView(ListView):
    model = Section
    template_name = 'contents/tutorial_list.html'
    context_object_name = 'sections'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['tutorials'] = Tutorial.objects.all()
        return context


class SceneListView(ListView):
    model = UserScene
    template_name = 'contents/user_scene_list.html'
    context_object_name = 'scenes'

    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return HttpResponse(status=401)
        return super().dispatch(request, *args, **kwargs)

    def get_queryset(self):
        return UserScene.objects.filter(user=self.request.user)

    def get_context_data(self, *, object_list=None, **kwargs):
        context = super().get_context_data(**kwargs)
        context['owner'] = self.request.user
        return context

