from django.urls import path, include
from .views import PlaceViewSet, SpotViewSet, SpotTypeTableViewSet, PlaceRatingInfoViewSet, SpotTypeViewSet, \
    User_SpotViewSet, Spot_FoodViewSet, Spot_ActivityViewSet, SpotRatingInfoViewSet, UserPlaceViewSet, ReviewPlaceViewSet, \
     ReviewSpotViewSet, SpotVisitCountViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('places', PlaceViewSet, basename='places')
router.register('spots', SpotViewSet, basename='spots')
router.register('spot_type_tables', SpotTypeTableViewSet, basename='spot_type_tables')
router.register('place_rating_infos', PlaceRatingInfoViewSet, basename='place_rating_infos')
router.register('spot_types', SpotTypeViewSet, basename='spot_types')
router.register('user_spots', User_SpotViewSet, basename='user_spots')
router.register('spot_foods', Spot_FoodViewSet, basename='spot_foods')
router.register('spot_activities', Spot_ActivityViewSet, basename='spot_activities')
router.register('spot_rating_infos', SpotRatingInfoViewSet, basename='spot_rating_infos')
router.register('review_places', ReviewPlaceViewSet, basename='review_places')
router.register('user_places', UserPlaceViewSet, basename='user_places')
router.register('review_spots', ReviewSpotViewSet, basename='review_spots')
router.register('spot_visit_counts', SpotVisitCountViewSet, basename='spot_visit_counts')

urlpatterns = [
    path('api/', include(router.urls)),
]