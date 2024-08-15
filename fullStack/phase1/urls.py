from django.urls import path
from .views import TodoView,TodoEditDeleteView,TodoCreateView

urlpatterns = [
    path('',TodoView.as_view(),name='todo'),
    path('edit/<int:pk>/',TodoEditDeleteView.as_view(),name='edit'),
    path('create/',TodoCreateView.as_view(),name='create')
]