from django.db import models
from django.contrib.auth.models import User

class Admission(models.Model):
    patient_nom = models.CharField(max_length=100)
    age = models.IntegerField()
    motif_admission = models.TextField()
    chambre = models.CharField(max_length=20)
    date_admission = models.DateTimeField(auto_now_add=True)
    medecin_responsable = models.ForeignKey(User, on_delete=models.CASCADE, related_name='admissions')

    def __str__(self):
        return f"Admission de {self.patient_nom} - Chambre {self.chambre}"
