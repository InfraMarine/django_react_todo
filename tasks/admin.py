from django.contrib import admin
from tasks.models import Project, Task

# Register your models here.
admin.site.register(Project)
admin.site.register(Task)