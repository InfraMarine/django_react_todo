from rest_framework import serializers
from .models import Project, Task
from django.utils import timezone


class TaskSerializer(serializers.ModelSerializer):
    overdued = serializers.SerializerMethodField()

    class Meta:
        model = Task
        fields = ('__all__')

    def get_overdued(self, obj):
        return obj.status == obj.Statuses.ONGOING and timezone.localtime() > obj.deadline


class ProjectSerializer(serializers.ModelSerializer):
    tasks = TaskSerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = ('id', 'name', 'created_at', 'author', 'tasks')

