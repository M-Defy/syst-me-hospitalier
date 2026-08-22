from django.db import models
from patients.models import Patient

class Lit(models.Model):
    numero = models.CharField(max_length=10, unique=True)
    chambre = models.CharField(max_length=10)
    est_occupe = models.BooleanField(default=False)

    def __str__(self):
        return f"Lit {self.numero} (Chambre {self.chambre})"

class Sejour(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='sejours')
    lit = models.ForeignKey(Lit, on_delete=models.SET_NULL, null=True, blank=True)
    date_entree = models.DateTimeField(auto_now_add=True)
    date_sortie = models.DateTimeField(null=True, blank=True)
    motif = models.TextField()

    def __str__(self):
        return f"Séjour de {self.patient} - {self.date_entree.strftime('%d/%m/%Y')}"
