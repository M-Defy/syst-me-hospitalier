from django.urls import include, path
from rest_framework.routers import DefaultRouter

from prescriptions.views import PrescriptionViewSet

router = DefaultRouter()
router.register(r'prescriptions', PrescriptionViewSet, basename='prescription')

urlpatterns = [
    path('', include(router.urls)),
]
