from django.shortcuts import render
from rest_framework import viewsets
from .models import Hotel, Hotel_Attribute, Hotel_Attribute_Table, \
    HotelRatingInfo, Room, RoomPriceInfo, Room_Attribute, Room_Attribute_Table
from .serializers import HotelSerializer, Hotel_AttributeSerializer, Hotel_Attribute_TableSerializer, \
    HotelRatingInfoSerializer, RoomSerializer, RoomPriceInfoSerializer, Room_AttributeSerializer, \
    Room_Attribute_TableSerializer


# Create your views here.

class HotelViewSet(viewsets.ModelViewSet):
    queryset = Hotel.objects.all()
    serializer_class = HotelSerializer


class Hotel_AttributeViewSet(viewsets.ModelViewSet):
    queryset = Hotel_Attribute.objects.all()
    serializer_class = Hotel_AttributeSerializer


class Hotel_Attribute_TableViewSet(viewsets.ModelViewSet):
    queryset = Hotel_Attribute_Table.objects.all()
    serializer_class = Hotel_Attribute_TableSerializer


class HotelRatingInfoViewSet(viewsets.ModelViewSet):
    queryset = HotelRatingInfo.objects.all()
    serializer_class = HotelRatingInfoSerializer


class RoomViewSet(viewsets.ModelViewSet):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer


class RoomPriceInfoViewSet(viewsets.ModelViewSet):
    queryset = RoomPriceInfo.objects.all()
    serializer_class = RoomPriceInfoSerializer


class Room_AttributeViewSet(viewsets.ModelViewSet):
    queryset = Room_Attribute.objects.all()
    serializer_class = Room_AttributeSerializer


class Room_Attribute_TableViewSet(viewsets.ModelViewSet):
    queryset = Room_Attribute_Table.objects.all()
    serializer_class = Room_Attribute_TableSerializer
