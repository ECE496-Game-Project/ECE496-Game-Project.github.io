from django.db import models


class Section(models.Model):
    id = models.AutoField(unique=True, primary_key=True)
    name = models.CharField(max_length=120)

    def __str__(self):
        return f"{self.id}-{self.name}"


class Tutorial(models.Model):
    id = models.AutoField(unique=True, primary_key=True)
    name = models.CharField(max_length=120)
    description = models.CharField(max_length=120)
    section = models.ForeignKey(Section, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.id}-{self.name}"
