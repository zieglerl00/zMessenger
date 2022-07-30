from datetime import datetime
from django.contrib.auth.models import User

from django.db import models

# Create your models here.


class Room(models.Model):
    name = models.CharField(max_length=255)


class Message(models.Model):
    message = models.CharField(max_length=150000)
    date = models.DateTimeField(auto_now_add=datetime.now)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
