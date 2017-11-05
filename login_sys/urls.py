from django.conf.urls import url
from .views import *

urlpatterns = [
    url(r'^hello/', Hello.as_view()),
]