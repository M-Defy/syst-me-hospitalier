from django.contrib import admin

from admissions.models import Lit, Sejour


@admin.register(Lit)
class LitAdmin(admin.ModelAdmin):
    list_display = ('numero', 'service', 'statut')
    list_filter = ('service', 'statut')


@admin.register(Sejour)
class SejourAdmin(admin.ModelAdmin):
    list_display = ('id', 'patient', 'lit', 'date_admission', 'date_sortie', 'statut')
    list_filter = ('statut',)
