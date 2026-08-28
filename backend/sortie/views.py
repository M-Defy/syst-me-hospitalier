from rest_framework import viewsets, permissions
from .models import Sortie
from .serializers import SortieSerializer

class SortieViewSet(viewsets.ModelViewSet):
    queryset = Sortie.objects.all()
    serializer_class = SortieSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(medecin=self.request.user)