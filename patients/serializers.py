from rest_framework import serializers

from patients.models import Patient


class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = [
            'id', 'nom', 'prenom', 'date_naissance', 'sexe',
            'adresse', 'contact_urgence',
            'date_creation', 'date_modification',
        ]
        read_only_fields = ['id', 'date_creation', 'date_modification']
