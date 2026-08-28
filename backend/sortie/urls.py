from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SortieViewSet

router = DefaultRouter()
router.register(r'sorties', SortieViewSet, basename='sortie')

urlpatterns = [
    path('', include(router.urls)),
]