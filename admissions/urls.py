from django.urls import include, path
from rest_framework.routers import DefaultRouter

from admissions.views import LitViewSet, SejourViewSet

router = DefaultRouter()
router.register(r'lits', LitViewSet, basename='lit')
router.register(r'sejours', SejourViewSet, basename='sejour')

urlpatterns = [
    path('', include(router.urls)),
]
