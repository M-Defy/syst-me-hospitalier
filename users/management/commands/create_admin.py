import os
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

class Command(BaseCommand):
    help = "Crée un superuser à partir de variables d'environnement, si absent."

    def handle(self, *args, **options):
        User = get_user_model()

        existing = list(User.objects.values_list('username', flat=True))
        self.stdout.write(self.style.NOTICE(f"Utilisateurs existants : {existing}"))

        email = os.environ.get('DJANGO_SUPERUSER_EMAIL')
        password = os.environ.get('DJANGO_SUPERUSER_PASSWORD')
        username = os.environ.get('DJANGO_SUPERUSER_USERNAME')

        if not email or not password or not username:
            self.stdout.write(self.style.WARNING("Variables DJANGO_SUPERUSER_* absentes, on saute."))
            return

        if User.objects.filter(username=username).exists():
            self.stdout.write(self.style.SUCCESS(f"Superuser '{username}' déjà existant."))
            return

        User.objects.create_superuser(username=username, email=email, password=password)
        self.stdout.write(self.style.SUCCESS(f"Superuser créé : {username}"))