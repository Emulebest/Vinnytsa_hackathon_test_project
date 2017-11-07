from django.db import models


class Review(models.Model):
    username = models.CharField(max_length=150)
    repo_name = models.TextField()
    owner_name = models.CharField(max_length=150)
    review = models.TextField()
    rating = models.FloatField()
