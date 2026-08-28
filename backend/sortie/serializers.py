from rest_framework import serializers
from .models import Sortie

class SortieSerializer(serializers.ModelSerializer):
    medecin = serializers.ReadOnlyField(source='medecin.username')

    class Meta:
        model = Sortie
        fields = ['id', 'patient_nom', 'medecin', 'date_sortie', 'diagnostic_final', 'autorise']