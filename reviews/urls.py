from django.conf.urls import url
from .views import *

urlpatterns = [
    url(r'^login/', LoginView.as_view()),
    url(r'^create-review/', ReviewView.as_view()),
]