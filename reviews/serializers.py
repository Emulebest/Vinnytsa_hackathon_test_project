from rest_framework import serializers
from .models import *


class ReviewSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Review
        fields = ("username", "repo_name", "owner_name", "review", "rating")
