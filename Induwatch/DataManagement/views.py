from django.shortcuts import render
from django.http import HttpResponse

def DataManagement(request):
    return render(request, 'DataManagement/datamanag.html')
