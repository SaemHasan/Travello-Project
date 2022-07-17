from django.urls import path, include
from .views import ActivityViewSet, AgencyViewSet, ActivityType_TableViewSet, Activity_AgencyViewSet, ActivityPriceInfoViewSet, ActivityRatingInfoViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('activities', ActivityViewSet, basename='activities')
router.register('agencies', AgencyViewSet, basename='agencies')
router.register('activity_types', ActivityType_TableViewSet, basename='activity_types')
router.register('activity_agencies', Activity_AgencyViewSet, basename='activity_agencies')
router.register('activity_price_infos', ActivityPriceInfoViewSet, basename='activity_price_infos')
router.register('activity_rating_infos', ActivityRatingInfoViewSet, basename='activity_rating_infos')

urlpatterns = [
    path('api/', include(router.urls)),
]