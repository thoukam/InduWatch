from django.shortcuts import render
from django.contrib.auth.decorators import login_required
import random
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt


@login_required  # Vérifie si l'utilisateur est connecté
@csrf_exempt
def generate_sensor_data(request):
    # Simuler des valeurs aléatoires de capteurs
    data = {
        "temperature": random.uniform(0, 1000),  # Température en degrés Celsius
        "humidity": random.uniform(0, 100),    # Humidité en pourcentage
        "pressure": random.uniform(300, 1050)  # Pression en hPa
    }
    return JsonResponse(data)

@login_required  # Vérifie si l'utilisateur est connecté
def dashboard_view(request):
    return render(request, 'dashboard/dashboard.html')
