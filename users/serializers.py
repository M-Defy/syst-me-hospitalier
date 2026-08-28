from rest_framework import serializers

from users.models import User


class UserSerializer(serializers.ModelSerializer):
    """Représentation d'un utilisateur, sans exposer le mot de passe."""

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'role', 'is_staff']
        read_only_fields = ['id', 'is_staff']


class UserCreateSerializer(serializers.ModelSerializer):
    """
    Utilisé par un administrateur pour créer un compte utilisateur et lui
    attribuer un rôle. Le mot de passe est toujours hashé par Django, jamais
    stocké en clair.
    """

    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'role', 'password']
        read_only_fields = ['id']

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)
