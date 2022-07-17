from django.urls import path, include
from .views import HotelViewSet, Hotel_AttributeViewSet, Hotel_Attribute_TableViewSet, HotelRatingInfoViewSet, \
    RoomViewSet, RoomPriceInfoViewSet, Room_AttributeViewSet, Room_Attribute_TableViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('hotels', HotelViewSet, basename='hotels')
router.register('hotel_attributes', Hotel_AttributeViewSet, basename='hotel_attributes')
router.register('hotel_attribute_tables', Hotel_Attribute_TableViewSet, basename='hotel_attribute_tables')
router.register('hotel_rating_infos', HotelRatingInfoViewSet, basename='hotel_rating_infos')
router.register('rooms', RoomViewSet, basename='rooms')
router.register('room_price_infos', RoomPriceInfoViewSet, basename='room_price_infos')
router.register('room_attributes', Room_AttributeViewSet, basename='room_attributes')
router.register('room_attribute_tables', Room_Attribute_TableViewSet, basename='room_attribute_tables')


urlpatterns = [
    path('api/', include(router.urls)),
]