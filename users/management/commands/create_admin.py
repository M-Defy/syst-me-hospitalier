import os
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

class Command(BaseCommand):
    help = "Crée ou met à jour le superuser à partir de variables d'environnement."

    def handle(self, *args, **options):
        User = get_user_model()

        email = os.environ.get('DJANGO_SUPERUSER_EMAIL')
        password = os.environ.get('DJANGO_SUPERUSER_PASSWORD')
        username = os.environ.get('DJANGO_SUPERUSER_USERNAME')

        if not email or not password or not username:
            self.stdout.write(self.style.WARNING("Variables DJANGO_SUPERUSER_* absentes, on saute."))
            return

        user, created = User.objects.get_or_create(
            username=username,
            defaults={'email': email, 'is_staff': True, 'is_superuser': True}
        )
        user.set_password(password)
        user.is_staff = True
        user.is_superuser = True
        user.email = email
        user.save()

        if created:
            self.stdout.write(self.style.SUCCESS(f"Superuser créé : {username}"))
        else:
            self.stdout.write(self.style.SUCCESS(f"Superuser '{username}' mis à jour (mot de passe réinitialisé)."))