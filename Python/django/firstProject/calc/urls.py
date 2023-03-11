from django.urls import path
# . means all
from . import views

urlpatterns = [
    path('', views.home, name = 'home'),
    path('add', views.add, name = 'add')
]