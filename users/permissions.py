"""
Permissions RBAC réutilisables pour l'ensemble du projet SIH.

Le rôle métier (MEDECIN / INFIRMIER / ADMINISTRATIF) est porté par
``users.models.User.role`` et doit réellement conditionner l'accès aux
données, en plus de la simple authentification.
"""
from rest_framework.permissions import BasePermission

from users.models import User


class IsMedecin(BasePermission):
    """Autorise uniquement les utilisateurs ayant le rôle MEDECIN."""

    message = "Seul un médecin peut effectuer cette action."

    def has_permission(self, request, view):
        user = request.user
        return bool(user and user.is_authenticated and user.role == User.Role.MEDECIN)


class IsInfirmier(BasePermission):
    """Autorise uniquement les utilisateurs ayant le rôle INFIRMIER."""

    message = "Seul un infirmier peut effectuer cette action."

    def has_permission(self, request, view):
        user = request.user
        return bool(user and user.is_authenticated and user.role == User.Role.INFIRMIER)


class IsMedecinOuInfirmier(BasePermission):
    """Autorise le personnel soignant (MEDECIN ou INFIRMIER)."""

    message = "Accès réservé au personnel soignant (médecin ou infirmier)."

    def has_permission(self, request, view):
        user = request.user
        return bool(
            user
            and user.is_authenticated
            and user.role in (User.Role.MEDECIN, User.Role.INFIRMIER)
        )


class IsAdministratif(BasePermission):
    """Autorise uniquement les utilisateurs ayant le rôle ADMINISTRATIF."""

    message = "Accès réservé au personnel administratif."

    def has_permission(self, request, view):
        user = request.user
        return bool(user and user.is_authenticated and user.role == User.Role.ADMINISTRATIF)


class IsAdminStaff(BasePermission):
    """
    Autorise uniquement les comptes administrateurs Django (is_staff/is_superuser),
    utilisés pour la gestion des comptes utilisateurs (création, attribution de rôle).
    """

    message = "Seul un administrateur peut gérer les comptes utilisateurs."

    def has_permission(self, request, view):
        user = request.user
        return bool(user and user.is_authenticated and user.is_staff)
