from django.db import models
from django.contrib.auth.models import User

class Prescription(models.Model):
    medecin = models.ForeignKey(User, on_delete=models.CASCADE, related_name='prescriptions_faites')
    patient_nom = models.CharField(max_length=150)
    medicament = models.CharField(max_length=255)
    posologie = models.CharField(max_length=255) # ex: "1 comprimé 3x par jour"
    duree_traitement = models.CharField(max_length=100) # ex: "7 jours"
    date_creation = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Prescription pour {self.patient_nom} - {self.medicament}"
