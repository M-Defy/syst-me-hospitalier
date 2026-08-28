from django.contrib import admin

from patients.models import Patient


@admin.register(Patient)
class PatientAdmin(admin.ModelAdmin):
    list_display = ('id', 'nom', 'prenom', 'date_naissance', 'sexe', 'date_creation', 'date_modification')
    search_fields = ('nom', 'prenom')
