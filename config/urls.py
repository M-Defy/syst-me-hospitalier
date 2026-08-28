"""
URL configuration for the SIH project.
"""
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('users.urls')),
    path('api/', include('patients.urls')),
    path('api/', include('admissions.urls')),
    path('api/', include('prescriptions.urls')),
]
