from rest_framework import serializers
from .models import Admission

class AdmissionSerializer(serializers.ModelSerializer):
    medecin_responsable = serializers.ReadOnlyField(source='medecin_responsable.username')

    class Meta:
        model = Admission
        fields = ['id', 'patient_nom', 'age', 'motif_admission', 'chambre', 'date_admission', 'medecin_responsable']