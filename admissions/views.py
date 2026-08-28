from rest_framework import permissions, status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from admissions.models import Lit, Sejour
from admissions.serializers import LitSerializer, SejourSerializer, SejourSortieSerializer
from users.permissions import IsAdministratif, IsMedecinOuInfirmier


class IsAdministratifOrReadOnly(permissions.BasePermission):
    """La gestion de l'inventaire des lits est réservée au personnel administratif."""

    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return bool(request.user and request.user.is_authenticated)
        return bool(
            request.user
            and request.user.is_authenticated
            and (request.user.is_staff or request.user.role == 'ADMINISTRATIF')
        )


class LitViewSet(viewsets.ModelViewSet):
    queryset = Lit.objects.all().order_by('numero')
    serializer_class = LitSerializer
    permission_classes = [IsAdministratifOrReadOnly]
    http_method_names = ['get', 'post', 'patch', 'head', 'options']

    @action(detail=False, methods=['get'])
    def disponibles(self, request):
        """GET /api/lits/disponibles/ — liste des lits actuellement libres."""
        lits = self.get_queryset().filter(statut=Lit.StatutLit.LIBRE)
        return Response(self.get_serializer(lits, many=True).data)


class SejourViewSet(viewsets.ModelViewSet):
    """
    Gestion des séjours (admissions). La sortie ne peut se faire que via
    l'action dédiée `sortie`, qui met à jour date_sortie + statut et libère
    réellement le lit.
    """

    queryset = Sejour.objects.all().order_by('-date_admission')
    serializer_class = SejourSerializer
    permission_classes = [permissions.IsAuthenticated]
    http_method_names = ['get', 'post', 'patch', 'head', 'options']

    def get_queryset(self):
        queryset = super().get_queryset()
        statut = self.request.query_params.get('statut')
        if statut:
            queryset = queryset.filter(statut=statut)
        patient_id = self.request.query_params.get('patient')
        if patient_id:
            queryset = queryset.filter(patient_id=patient_id)
        return queryset

    @action(detail=True, methods=['post'])
    def sortie(self, request, pk=None):
        """POST /api/sejours/{id}/sortie/ — clôture le séjour et libère le lit."""
        sejour = self.get_object()
        if sejour.statut != Sejour.StatutSejour.EN_COURS:
            return Response(
                {'error': "Ce séjour n'est pas en cours."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        serializer = SejourSortieSerializer(instance=sejour, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(SejourSerializer(sejour).data)
