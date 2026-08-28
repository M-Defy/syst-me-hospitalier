from django.db import models
from patients.models import Patient

class Lit(models.Model):
    class StatutLit(models.TextChoices):
        LIBRE = 'LIBRE', 'Libre'
        OCCUPE = 'OCCUPE', 'Occupé'

    numero = models.CharField(max_length=10, unique=True)
    service = models.CharField(max_length=100)
    statut = models.CharField(max_length=10, choices=StatutLit.choices, default=StatutLit.LIBRE)

    def __str__(self):
        return f"Lit {self.numero} - {self.service} ({self.get_statut_display()})"


class Sejour(models.Model):
    class StatutSejour(models.TextChoices):
        EN_COURS = 'EN_COURS', 'En cours'
        TERMINE = 'TERMINE', 'Terminé'
        ANNULE = 'ANNULE', 'Annulé'

    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='sejours')
    lit = models.ForeignKey(Lit, on_delete=models.SET_NULL, null=True, blank=True)
    date_admission = models.DateTimeField(auto_now_add=True)
    date_sortie = models.DateTimeField(null=True, blank=True)
    statut = models.CharField(max_length=20, choices=StatutSejour.choices, default=StatutSejour.EN_COURS)

    def __str__(self):
        return f"Séjour de {self.patient} - {self.date_admission.strftime('%d/%m/%Y')}"
