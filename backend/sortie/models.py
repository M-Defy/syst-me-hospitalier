from django.db import models
from django.contrib.auth.models import User

class Sortie(models.Model):
    patient_nom = models.CharField(max_length=100)
    medecin = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sorties')
    date_sortie = models.DateTimeField(auto_now_add=True)
    diagnostic_final = models.TextField()
    autorise = models.BooleanField(default=True)

    def __str__(self):
        return f"Sortie de {self.patient_nom} - {self.date_sortie.strftime('%Y-%m-%d')}"