from datetime import date

from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient

from patients.models import Patient
from users.models import User


class PatientAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            username='medecin1', password='motdepasse123', role=User.Role.MEDECIN
        )
        self.client.force_authenticate(user=self.user)

    def test_unauthenticated_access_denied(self):
        anon_client = APIClient()
        response = anon_client.get('/api/patients/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_patient(self):
        response = self.client.post('/api/patients/', {
            'nom': 'Rakoto',
            'prenom': 'Jean',
            'date_naissance': '1990-01-01',
            'sexe': 'M',
            'adresse': 'Antananarivo',
            'contact_urgence': '034 00 000 00',
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(Patient.objects.filter(nom='Rakoto').exists())

    def test_retrieve_patient(self):
        patient = Patient.objects.create(
            nom='Rasoa', prenom='Marie', date_naissance=date(1985, 5, 5), sexe='F'
        )
        response = self.client.get(f'/api/patients/{patient.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['nom'], 'Rasoa')

    def test_update_patient_is_traceable(self):
        patient = Patient.objects.create(
            nom='Rasoa', prenom='Marie', date_naissance=date(1985, 5, 5), sexe='F'
        )
        initial_modification = patient.date_modification

        response = self.client.patch(
            f'/api/patients/{patient.id}/', {'adresse': 'Nouvelle adresse'}, format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        patient.refresh_from_db()
        self.assertEqual(patient.adresse, 'Nouvelle adresse')
        self.assertGreaterEqual(patient.date_modification, initial_modification)
