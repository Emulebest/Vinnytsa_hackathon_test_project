from django.conf.urls import url
from .views import *

urlpatterns = [
    url(r'^login/', LoginView.as_view()),
    url(r'^create-review/', ReviewCreateView.as_view()),
    url(r'^user-reviews/', ReviewListView.as_view()),
]