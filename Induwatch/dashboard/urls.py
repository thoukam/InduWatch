from django.urls import path
from . import views

urlpatterns = [
    path('', views.dashboard_view, name='dashboard'),  # URL principale du tableau de bord
    path('sensor-data/', views.generate_sensor_data, name='sensor_data'),
]
