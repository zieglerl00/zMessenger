from django.db import models

# Create your models here.


class ShoppingItem(models.Model):
    name = models.CharField(max_length=255)
    quantity = models.IntegerField()
    created = models.DateTimeField(auto_now_add=True)
