from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    """
    POST /api/login/
    Body JSON : {"username": "votre_user", "password": "votre_password"}
    """
    username = request.data.get('username')
    password = request.data.get('password')

    if not username or not password:
        return Response(
            {'error': 'Veuillez fournir un nom d\'utilisateur et un mot de passe.'},
            status=status.HTTP_400_BAD_REQUEST
        )

    user = authenticate(username=username, password=password)

    if user is not None:
        token, _ = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'username': user.username,
            'email': user.email
        }, status=status.HTTP_200_OK)
    
    return Response(
        {'error': 'Nom d\'utilisateur ou mot de passe incorrect.'},
        status=status.HTTP_401_UNAUTHORIZED
    )


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_view(request):
    """
    POST /api/logout/
    Header : Authorization: Token <token_key>
    """
    request.user.auth_token.delete()
    return Response(
        {'message': 'Déconnexion réussie.'},
        status=status.HTTP_200_OK
    )