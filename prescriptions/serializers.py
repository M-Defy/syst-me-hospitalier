from rest_framework import serializers

from prescriptions.models import Prescription


class PrescriptionSerializer(serializers.ModelSerializer):
    medecin = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Prescription
        fields = [
            'id', 'patient', 'medecin', 'medicament', 'posologie',
            'date_prescription', 'statut', 'motif_annulation',
        ]
        read_only_fields = ['id', 'medecin', 'date_prescription', 'statut', 'motif_annulation']


class PrescriptionAnnulationSerializer(serializers.Serializer):
    """Une prescription annulée reste en base : seul son statut change."""

    motif_annulation = serializers.CharField(allow_blank=False)

    def validate_motif_annulation(self, value):
        if not value.strip():
            raise serializers.ValidationError("Le motif d'annulation est obligatoire.")
        return value

    def save(self, **kwargs):
        prescription = self.instance
        prescription.statut = Prescription.Statut.ANNULEE
        prescription.motif_annulation = self.validated_data['motif_annulation']
        prescription.save(update_fields=['statut', 'motif_annulation'])
        return prescription
