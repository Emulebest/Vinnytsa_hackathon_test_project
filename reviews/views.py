from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics
import requests
from .serializers import *
from .models import *


class LoginView(APIView):
    def post(self, request):
        username = request.data["username"]
        password = request.data["password"]
        r = requests.get('https://api.github.com/user', auth=(username, password))
        if r.status_code != 200:
            return Response({
                "error": "bad credentials"
            }, status=r.status_code)
        else:
            return Response({
                "user": r.json()
            })


class ReviewCreateView(generics.CreateAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer


class ReviewListView(generics.ListAPIView):
    serializer_class = ReviewSerializer

    def get_queryset(self):
        username_filter = self.request.GET["username", None]
        if not username_filter:
            return Review.objects.all()
        return Review.objects.filter(username=username_filter)
