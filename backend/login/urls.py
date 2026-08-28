"""
URL configuration for login project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path

from login.views import login_view, logout_view

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/login/', login_view, name='api_login'),
    path('api/logout/', logout_view, name='api_logout'),
    path('api/', include('prescription.urls')),  # Inclure les URLs de l'application prescription 
    path('api/', include('sortie.urls')),  # Inclure les URLs de l'application sortie 
    path('api/', include('admission.urls')),  # Inclure les URLs de l'application admission 
    path('api/', include('patient.urls')),  # Inclure les URLs de l'application patient 
]
