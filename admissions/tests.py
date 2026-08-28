from datetime import date, timedelta

from django.test import TestCase
from django.utils import timezone
from rest_framework import status
from rest_framework.test import APIClient

from admissions.models import Lit, Sejour
from patients.models import Patient
from users.models import User


class AdmissionRulesTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            username='admin1', password='motdepasse123', role=User.Role.ADMINISTRATIF
        )
        self.client.force_authenticate(user=self.user)
        self.patient = Patient.objects.create(
            nom='Rakoto', prenom='Jean', date_naissance=date(1990, 1, 1), sexe='M'
        )
        self.lit = Lit.objects.create(numero='101A', service='Cardiologie')

    def test_list_lits_disponibles(self):
        response = self.client.get('/api/lits/disponibles/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_create_sejour_occupies_lit(self):
        response = self.client.post('/api/sejours/', {
            'patient': self.patient.id,
            'lit': self.lit.id,
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.lit.refresh_from_db()
        self.assertEqual(self.lit.statut, Lit.StatutLit.OCCUPE)

    def test_patient_cannot_have_two_sejours_en_cours(self):
        Sejour.objects.create(patient=self.patient, lit=self.lit, statut=Sejour.StatutSejour.EN_COURS)
        autre_lit = Lit.objects.create(numero='102A', service='Cardiologie')

        response = self.client.post('/api/sejours/', {
            'patient': self.patient.id,
            'lit': autre_lit.id,
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_lit_cannot_be_assigned_to_two_patients(self):
        autre_patient = Patient.objects.create(
            nom='Rasoa', prenom='Marie', date_naissance=date(1985, 5, 5), sexe='F'
        )
        Sejour.objects.create(patient=self.patient, lit=self.lit, statut=Sejour.StatutSejour.EN_COURS)

        response = self.client.post('/api/sejours/', {
            'patient': autre_patient.id,
            'lit': self.lit.id,
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_sortie_requires_date_sortie_after_admission(self):
        sejour = Sejour.objects.create(patient=self.patient, lit=self.lit, statut=Sejour.StatutSejour.EN_COURS)
        date_invalide = sejour.date_admission - timedelta(days=1)

        response = self.client.post(f'/api/sejours/{sejour.id}/sortie/', {
            'date_sortie': date_invalide.isoformat(),
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_sortie_liberates_lit_and_updates_sejour(self):
        sejour = Sejour.objects.create(patient=self.patient, lit=self.lit, statut=Sejour.StatutSejour.EN_COURS)
        self.lit.statut = Lit.StatutLit.OCCUPE
        self.lit.save()

        response = self.client.post(f'/api/sejours/{sejour.id}/sortie/', {}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        sejour.refresh_from_db()
        self.lit.refresh_from_db()
        self.assertEqual(sejour.statut, Sejour.StatutSejour.TERMINE)
        self.assertIsNotNone(sejour.date_sortie)
        self.assertEqual(self.lit.statut, Lit.StatutLit.LIBRE)
