from django.views.generic.list import ListView
from .models import Scene
from django.http import HttpResponse
from django.shortcuts import get_object_or_404


class SceneListView(ListView):
    model = Scene
    template_name = 'scenes/list.html'
    context_object_name = 'scenes'

    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return HttpResponse(status=401)
        return super().dispatch(request, *args, **kwargs)

    def get_queryset(self):
        return Scene.objects.filter(user=self.request.user)

    def get_context_data(self, *, object_list=None, **kwargs):
        context = super().get_context_data(**kwargs)
        context['owner'] = self.request.user
        return context
