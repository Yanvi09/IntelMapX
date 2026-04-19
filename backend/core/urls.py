from django.urls import path
from .views import process_location_data

urlpatterns = [
    path('process-data/', process_location_data),
]