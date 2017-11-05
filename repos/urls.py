from django.conf.urls import url
from .views import *

urlpatterns = [
    url(r'^search/', SearchRepos.as_view()),
]