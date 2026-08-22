from django.db import models

class Patient(models.Model):
    class Sexe(models.TextChoices):
        MASCULIN = 'M', 'Masculin'
        FEMININ = 'F', 'Féminin'
        AUTRE = 'AUTRE', 'Autre'

    nom = models.CharField(max_length=100)
    prenom = models.CharField(max_length=100)
    date_naissance = models.DateField()
    sexe = models.CharField(max_length=10, choices=Sexe.choices, default=Sexe.MASCULIN)
    adresse = models.TextField(blank=True)
    contact_urgence = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return f"{self.nom} {self.prenom}"
