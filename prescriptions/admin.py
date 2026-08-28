from django.contrib import admin

from prescriptions.models import Prescription


@admin.register(Prescription)
class PrescriptionAdmin(admin.ModelAdmin):
    list_display = ('id', 'patient', 'medecin', 'medicament', 'statut', 'date_prescription')
    list_filter = ('statut',)

    def has_delete_permission(self, request, obj=None):
        # Une prescription ne doit jamais être supprimable, y compris depuis l'admin.
        return False
