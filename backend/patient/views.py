from rest_framework import viewsets, permissions
from .models import Patient
from .serializers import PatientSerializer

class PatientViewSet(viewsets.ModelViewSet):
    queryset = Patient.objects.all().order_by('-cree_le')
    serializer_class = PatientSerializer
    permission_classes = [permissions.IsAuthenticated]