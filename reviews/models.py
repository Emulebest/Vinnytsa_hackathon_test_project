from django.db import models


class Review(models.Model):
    name = models.CharField(max_length=150)
    review = models.TextField()
    rate = models.FloatField()
