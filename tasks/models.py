from django.db import models
from django.contrib.auth.models import User
from django.db.models.deletion import CASCADE
from django.utils.translation import gettext_lazy as _
# Create your models here.

class Project(models.Model):
    name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, related_name="projects", on_delete=CASCADE)


class Task(models.Model):
    
    class Statuses (models.TextChoices):
        COMPLETED = 'CMP', _('Completed')
        ONGOING = 'ONG', _('Ongoing')

    status = models.CharField(
        max_length=3,
        choices=Statuses.choices,
        default=Statuses.ONGOING,
    )

    descr = models.CharField(max_length=200)
    project = models.ForeignKey(Project, related_name="tasks", on_delete=CASCADE)
    priority = models.IntegerField()
    deadline = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    
