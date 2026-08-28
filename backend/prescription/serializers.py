from rest_framework import serializers
from .models import Prescription

class PrescriptionSerializer(serializers.ModelSerializer):
    medecin = serializers.ReadOnlyField(source='medecin.username')

    class Meta:
        model = Prescription
        fields = ['id', 'medecin', 'patient_nom', 'medicament', 'posologie', 'duree_traitement', 'date_creation']