from django.contrib.auth import authenticate
from rest_framework import status, viewsets
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes, throttle_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from users.models import User
from users.permissions import IsAdminStaff
from users.serializers import LoginSerializer, UserCreateSerializer, UserSerializer
from users.throttles import LoginRateThrottle


@api_view(['POST'])
@permission_classes([AllowAny])
@throttle_classes([LoginRateThrottle])
def login_view(request):
    """
    POST /api/auth/login/
    Body JSON : {"username": "...", "password": "..."}
    Retourne un token d'authentification ainsi que le profil (rôle inclus).
    """
    serializer = LoginSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    username = serializer.validated_data['username']
    password = serializer.validated_data['password']

    user = authenticate(request, username=username, password=password)

    if user is None:
        return Response(
            {'error': "Nom d'utilisateur ou mot de passe incorrect."},
            status=status.HTTP_401_UNAUTHORIZED,
        )

    token, _ = Token.objects.get_or_create(user=user)
    return Response(
        {
            'token': token.key,
            'user': UserSerializer(user).data,
        },
        status=status.HTTP_200_OK,
    )


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_view(request):
    """
    POST /api/auth/logout/
    Nécessite l'en-tête Authorization: Token <token>.
    """
    Token.objects.filter(user=request.user).delete()
    return Response({'message': 'Déconnexion réussie.'}, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def me_view(request):
    """GET /api/auth/me/ — profil de l'utilisateur connecté (dont son rôle)."""
    return Response(UserSerializer(request.user).data)


class UserViewSet(viewsets.ModelViewSet):
    """
    Gestion des comptes utilisateurs, réservée aux administrateurs
    (is_staff). Permet de créer un utilisateur et de lui attribuer un rôle.
    """

    queryset = User.objects.all().order_by('username')
    permission_classes = [IsAdminStaff]
    http_method_names = ['get', 'post', 'patch', 'head', 'options']

    def get_serializer_class(self):
        if self.action == 'create':
            return UserCreateSerializer
        return UserSerializer
