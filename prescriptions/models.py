from django.db import models
from django.conf import settings
from patients.models import Patient

class Prescription(models.Model):
    class Statut(models.TextChoices):
        ACTIVE = 'ACTIVE', 'Active'
        ANNULEE = 'ANNULEE', 'Annulée'

    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='prescriptions')
    medecin = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='prescriptions_delivrees')
    medicament = models.CharField(max_length=200)
    posologie = models.TextField()
    date_prescription = models.DateTimeField(auto_now_add=True)
    statut = models.CharField(max_length=10, choices=Statut.choices, default=Statut.ACTIVE)
    motif_annulation = models.TextField(blank=True, default='')

    def __str__(self):
        return f"{self.medicament} pour {self.patient}"
