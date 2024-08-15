from django.db import models

class Todo(models.Model):

    title = models.TextField()
    status = models.BooleanField(default=False)

    def __str__(self): return self.title


