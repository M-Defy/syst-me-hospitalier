from django.core.management import call_command
from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status

from users.models import User


class UserModelTest(TestCase):
    def test_password_is_hashed(self):
        user = User.objects.create_user(username='doc1', password='motdepasse123', role=User.Role.MEDECIN)
        self.assertNotEqual(user.password, 'motdepasse123')
        self.assertTrue(user.check_password('motdepasse123'))

    def test_default_role_is_administratif(self):
        user = User.objects.create_user(username='u1', password='motdepasse123')
        self.assertEqual(user.role, User.Role.ADMINISTRATIF)

    def test_role_choices(self):
        self.assertIn(User.Role.MEDECIN, [User.Role.MEDECIN, User.Role.INFIRMIER, User.Role.ADMINISTRATIF])


class AuthAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            username='medecin1', password='motdepasse123', role=User.Role.MEDECIN
        )

    def test_login_success_returns_token_and_role(self):
        response = self.client.post(
            '/api/auth/login/', {'username': 'medecin1', 'password': 'motdepasse123'}, format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('token', response.data)
        self.assertEqual(response.data['user']['role'], User.Role.MEDECIN)

    def test_login_failure_wrong_password(self):
        response = self.client.post(
            '/api/auth/login/', {'username': 'medecin1', 'password': 'mauvais'}, format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_logout_requires_authentication(self):
        response = self.client.post('/api/auth/logout/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_repeated_failed_logins_are_throttled(self):
        """Protection basique contre les tentatives de connexion répétées."""
        last_response = None
        for _ in range(6):
            last_response = self.client.post(
                '/api/auth/login/', {'username': 'medecin1', 'password': 'mauvais'}, format='json'
            )
        self.assertEqual(last_response.status_code, status.HTTP_429_TOO_MANY_REQUESTS)


class UserCreationByAdminTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.admin = User.objects.create_superuser(username='admin', password='motdepasse123', email='a@a.com')
        self.client.force_authenticate(user=self.admin)

    def test_admin_can_create_user_with_role(self):
        response = self.client.post(
            '/api/auth/users/',
            {'username': 'infirmier1', 'password': 'motdepasse123', 'role': User.Role.INFIRMIER},
            format='json',
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        created = User.objects.get(username='infirmier1')
        self.assertEqual(created.role, User.Role.INFIRMIER)
        self.assertTrue(created.check_password('motdepasse123'))

    def test_non_admin_cannot_create_user(self):
        self.client.force_authenticate(user=User.objects.create_user(
            username='medecin1', password='motdepasse123', role=User.Role.MEDECIN
        ))
        response = self.client.post(
            '/api/auth/users/',
            {'username': 'x', 'password': 'motdepasse123', 'role': User.Role.INFIRMIER},
            format='json',
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)


class MigrationsConsistencyTest(TestCase):
    def test_no_missing_migrations(self):
        """Les migrations doivent être exécutables sur une base vide (makemigrations --check)."""
        try:
            call_command('makemigrations', '--check', '--dry-run', verbosity=0)
        except SystemExit as exc:
            self.fail(f"Des migrations sont manquantes : {exc}")
