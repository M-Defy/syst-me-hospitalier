from rest_framework import filters, permissions, viewsets

from patients.models import Patient
from patients.serializers import PatientSerializer


class PatientViewSet(viewsets.ModelViewSet):
    """
    CRUD Patient. Chaque patient possède un identifiant unique (id).
    Les modifications sont horodatées via date_creation / date_modification.

    Accessible à tout utilisateur authentifié : la consultation du dossier
    administratif (identité, coordonnées) est nécessaire à tous les rôles
    (MEDECIN, INFIRMIER, ADMINISTRATIF). L'historique médical (prescriptions)
    est en revanche restreint — voir prescriptions.views.PrescriptionViewSet.
    """

    queryset = Patient.objects.all().order_by('nom', 'prenom')
    serializer_class = PatientSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter]
    search_fields = ['nom', 'prenom']
