from django.db import models


class Review(models.Model):
    username = models.CharField(max_length=150)
    user_pic = models.URLField(default="https://avatars0.githubusercontent.com/u/26462528?v=4")
    repo_name = models.TextField()
    owner_name = models.CharField(max_length=150)
    review = models.TextField()
    rating = models.FloatField()
