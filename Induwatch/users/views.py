from django.contrib.auth import authenticate, login
from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth import logout
from django.contrib.auth.models import User

def login_view(request):
    if request.method == "POST":  # Traite uniquement les requêtes POST
        username = request.POST.get('username')
        password = request.POST.get('password')

        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            messages.success(request, f"Bienvenue, {user.username} !")
            return redirect('home')  # Redirige vers la page d'accueil
        else:
            if not username or not password:
                messages.error(request, "Veuillez remplir tous les champs.")
            else:
                messages.error(request, "Nom d'utilisateur ou mot de passe incorrect.")

    return render(request, 'users/login.html')

def logout_view(request):
    logout(request)
    messages.success(request, "Vous êtes déconnecté.")
    return redirect('login')  # Redirige vers la page de connexion


