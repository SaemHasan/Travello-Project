from django.urls import path, include
from .views import PlaceViewSet, SpotViewSet, TypeViewSet, PlaceRatingInfoViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('places', PlaceViewSet, basename='places')
router.register('spots', SpotViewSet, basename='spots')
router.register('types', TypeViewSet, basename='types')
router.register('place_rating_infos', PlaceRatingInfoViewSet, basename='place_rating_infos')

urlpatterns = [
    path('api/', include(router.urls)),
]