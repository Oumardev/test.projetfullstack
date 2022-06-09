from django.db import models

# Create your models here.
class Map(models.Model):
    speed = models.FloatField(null=False)
    duration = models.FloatField(null=False)
    latitude = models.FloatField(null=False)
    longitude = models.FloatField(null=False)
    datetime = models.CharField(max_length=255)