from django.urls import path
from .views import modify_string

urlpatterns = [
    path('modify-string/', modify_string, name='modify_string'),
]
