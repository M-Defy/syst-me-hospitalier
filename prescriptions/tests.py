from datetime import date

from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient

from patients.models import Patient
from prescriptions.models import Prescription
from users.models import User


class PrescriptionRBACTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.medecin = User.objects.create_user(username='medecin1', password='motdepasse123', role=User.Role.MEDECIN)
        self.infirmier = User.objects.create_user(username='infirmier1', password='motdepasse123', role=User.Role.INFIRMIER)
        self.administratif = User.objects.create_user(username='admin1', password='motdepasse123', role=User.Role.ADMINISTRATIF)
        self.patient = Patient.objects.create(
            nom='Rakoto', prenom='Jean', date_naissance=date(1990, 1, 1), sexe='M'
        )

    def _payload(self):
        return {
            'patient': self.patient.id,
            'medicament': 'Paracétamol',
            'posologie': '1g 3x/jour',
        }

    def test_medecin_can_create_prescription(self):
        self.client.force_authenticate(user=self.medecin)
        response = self.client.post('/api/prescriptions/', self._payload(), format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        prescription = Prescription.objects.get(id=response.data['id'])
        self.assertEqual(prescription.medecin, self.medecin)
        self.assertEqual(prescription.statut, Prescription.Statut.ACTIVE)

    def test_infirmier_cannot_create_prescription(self):
        self.client.force_authenticate(user=self.infirmier)
        response = self.client.post('/api/prescriptions/', self._payload(), format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_administratif_cannot_create_prescription(self):
        self.client.force_authenticate(user=self.administratif)
        response = self.client.post('/api/prescriptions/', self._payload(), format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_medecin_and_infirmier_can_consult_history(self):
        Prescription.objects.create(patient=self.patient, medecin=self.medecin, medicament='X', posologie='Y')

        self.client.force_authenticate(user=self.medecin)
        self.assertEqual(self.client.get('/api/prescriptions/').status_code, status.HTTP_200_OK)

        self.client.force_authenticate(user=self.infirmier)
        self.assertEqual(self.client.get('/api/prescriptions/').status_code, status.HTTP_200_OK)

    def test_administratif_cannot_consult_history(self):
        Prescription.objects.create(patient=self.patient, medecin=self.medecin, medicament='X', posologie='Y')
        self.client.force_authenticate(user=self.administratif)
        response = self.client.get('/api/prescriptions/')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)


class PrescriptionBusinessRulesTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.medecin = User.objects.create_user(username='medecin1', password='motdepasse123', role=User.Role.MEDECIN)
        self.patient = Patient.objects.create(
            nom='Rakoto', prenom='Jean', date_naissance=date(1990, 1, 1), sexe='M'
        )
        self.prescription = Prescription.objects.create(
            patient=self.patient, medecin=self.medecin, medicament='X', posologie='Y'
        )
        self.client.force_authenticate(user=self.medecin)

    def test_prescription_cannot_be_deleted(self):
        response = self.client.delete(f'/api/prescriptions/{self.prescription.id}/')
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)
        self.assertTrue(Prescription.objects.filter(id=self.prescription.id).exists())

    def test_annulation_requires_motif(self):
        response = self.client.post(f'/api/prescriptions/{self.prescription.id}/annuler/', {}, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_annulation_with_motif_keeps_prescription_in_db(self):
        response = self.client.post(
            f'/api/prescriptions/{self.prescription.id}/annuler/',
            {'motif_annulation': 'Erreur de dosage'},
            format='json',
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.prescription.refresh_from_db()
        self.assertEqual(self.prescription.statut, Prescription.Statut.ANNULEE)
        self.assertEqual(self.prescription.motif_annulation, 'Erreur de dosage')
        self.assertTrue(Prescription.objects.filter(id=self.prescription.id).exists())
