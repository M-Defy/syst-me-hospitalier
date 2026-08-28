from rest_framework import serializers

from admissions.models import Lit, Sejour


class LitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lit
        fields = ['id', 'numero', 'service', 'statut']
        read_only_fields = ['id']


class SejourSerializer(serializers.ModelSerializer):
    """
    Représente une admission (séjour). Le patient et le lit ne sont
    modifiables qu'à la création : la sortie doit obligatoirement passer par
    l'action dédiée `sortie` afin de garantir la cohérence métier (libération
    du lit, contrôle des dates, etc.).
    """

    class Meta:
        model = Sejour
        fields = ['id', 'patient', 'lit', 'date_admission', 'date_sortie', 'statut']
        read_only_fields = ['id', 'date_admission', 'date_sortie', 'statut']

    def validate(self, attrs):
        patient = attrs.get('patient') or getattr(self.instance, 'patient', None)
        lit = attrs.get('lit') or getattr(self.instance, 'lit', None)

        if self.instance is None:
            # Un patient ne peut avoir qu'un seul séjour EN_COURS.
            if Sejour.objects.filter(patient=patient, statut=Sejour.StatutSejour.EN_COURS).exists():
                raise serializers.ValidationError(
                    "Ce patient a déjà un séjour en cours."
                )
            # Un lit ne peut être affecté qu'à un seul patient à la fois : on se
            # base sur les séjours EN_COURS réellement existants (source de
            # vérité), et pas uniquement sur le champ dénormalisé `statut`.
            if lit is not None and (
                lit.statut != Lit.StatutLit.LIBRE
                or Sejour.objects.filter(lit=lit, statut=Sejour.StatutSejour.EN_COURS).exists()
            ):
                raise serializers.ValidationError("Ce lit n'est pas disponible.")

        return attrs

    def create(self, validated_data):
        sejour = super().create(validated_data)
        if sejour.lit is not None:
            sejour.lit.statut = Lit.StatutLit.OCCUPE
            sejour.lit.save(update_fields=['statut'])
        return sejour


class SejourSortieSerializer(serializers.Serializer):
    """Utilisé pour clôturer un séjour (sortie du patient)."""

    date_sortie = serializers.DateTimeField(required=False)

    def validate(self, attrs):
        sejour = self.instance
        date_sortie = attrs.get('date_sortie')
        from django.utils import timezone
        if date_sortie is None:
            date_sortie = timezone.now()
        if date_sortie < sejour.date_admission:
            raise serializers.ValidationError(
                "La date de sortie ne peut pas être antérieure à la date d'admission."
            )
        attrs['date_sortie'] = date_sortie
        return attrs

    def save(self, **kwargs):
        sejour = self.instance
        sejour.date_sortie = self.validated_data['date_sortie']
        sejour.statut = Sejour.StatutSejour.TERMINE
        sejour.save(update_fields=['date_sortie', 'statut'])

        # Une sortie doit réellement libérer le lit.
        if sejour.lit is not None:
            sejour.lit.statut = Lit.StatutLit.LIBRE
            sejour.lit.save(update_fields=['statut'])

        return sejour
