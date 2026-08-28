from rest_framework.throttling import AnonRateThrottle


class LoginRateThrottle(AnonRateThrottle):
    """
    Protection basique contre les tentatives de connexion répétées
    (force brute). Limite le nombre de tentatives de login par adresse IP.
    """

    scope = 'login'
