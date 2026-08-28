from rest_framework import permissions, status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from prescriptions.models import Prescription
from prescriptions.serializers import PrescriptionAnnulationSerializer, PrescriptionSerializer
from users.permissions import IsMedecin, IsMedecinOuInfirmier


class PrescriptionViewSet(viewsets.ModelViewSet):
    """
    - Seul un MEDECIN peut créer une prescription.
    - MEDECIN et INFIRMIER peuvent consulter (liste/historique) les
      prescriptions ; ADMINISTRATIF n'y a pas accès.
    - Une prescription n'est jamais supprimable (DELETE interdit) : elle ne
      peut être qu'annulée (statut ANNULEE + motif_annulation) via l'action
      dédiée `annuler`.
    """

    queryset = Prescription.objects.all().order_by('-date_prescription')
    serializer_class = PrescriptionSerializer
    # DELETE explicitement exclu : une prescription ne doit jamais être supprimable.
    http_method_names = ['get', 'post', 'head', 'options']

    def get_permissions(self):
        if self.action == 'create':
            return [permissions.IsAuthenticated(), IsMedecin()]
        if self.action == 'annuler':
            return [permissions.IsAuthenticated(), IsMedecin()]
        # list / retrieve : historique médical réservé au personnel soignant.
        return [permissions.IsAuthenticated(), IsMedecinOuInfirmier()]

    def get_queryset(self):
        queryset = super().get_queryset()
        patient_id = self.request.query_params.get('patient')
        if patient_id:
            queryset = queryset.filter(patient_id=patient_id)
        return queryset

    def perform_create(self, serializer):
        serializer.save(medecin=self.request.user)

    @action(detail=True, methods=['post'])
    def annuler(self, request, pk=None):
        """POST /api/prescriptions/{id}/annuler/ — annulation avec motif obligatoire."""
        prescription = self.get_object()
        if prescription.statut == Prescription.Statut.ANNULEE:
            return Response(
                {'error': 'Cette prescription est déjà annulée.'},
                status=status.HTTP_400_BAD_REQUEST,
            )
        serializer = PrescriptionAnnulationSerializer(instance=prescription, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(PrescriptionSerializer(prescription).data)
