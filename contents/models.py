from django.db import models
from django.contrib.auth.models import User


class Section(models.Model):
    id = models.AutoField(unique=True, primary_key=True)
    name = models.CharField(max_length=120)

    def __str__(self):
        return f"{self.id}-{self.name}"


class Scene(models.Model):
    id = models.AutoField(unique=True, primary_key=True)
    name = models.CharField(max_length=120)
    description = models.CharField(max_length=120)

    def __str__(self):
        return f"{self.id}-{self.name}"


class Tutorial(Scene):
    section = models.ForeignKey(Section, on_delete=models.CASCADE)


class UserScene(Scene):
    last_modified = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
