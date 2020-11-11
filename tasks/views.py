from django.http import request
from .models import Project, Task
from .serializers import ProjectSerializer, TaskSerializer
from rest_framework import generics
from rest_framework import viewsets

class ProjectViewSet(viewsets.ModelViewSet):
    serializer_class = ProjectSerializer

    def get_queryset(self):
        return self.request.user.projects.all()

class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    
    def get_queryset(self):
        return Task.objects.filter(project__author_id=self.request.user)