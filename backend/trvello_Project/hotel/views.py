from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Hotel, Hotel_Attribute, Hotel_Attribute_Table, \
    HotelRatingInfo, Room, RoomPriceInfo, Room_Attribute, Room_Attribute_Table
from .serializers import HotelSerializer, Hotel_AttributeSerializer, Hotel_Attribute_TableSerializer, \
    HotelRatingInfoSerializer, RoomSerializer, RoomPriceInfoSerializer, Room_AttributeSerializer, \
    Room_Attribute_TableSerializer


# Create your views here.

class HotelViewSet(viewsets.ModelViewSet):
    queryset = Hotel.objects.all()
    serializer_class = HotelSerializer


    @action(detail=False, methods=['post', 'get', 'put'])
    def getAllHotels(self, request):
        spot_id = int(request.data['spot_id'])
        #activity = Spot_Activity.objects.get(spot_id = spot_id)
        hotel = Hotel.objects.all().filter(spot_id_id = spot_id)

        # for i in food:
        #     food_id_list.append(i.food_id.food_id)
        print("Hereeeee")


        print(hotel)
        #return Response(food_id_list)

        return Response(HotelSerializer(hotel, many=True).data)


class Hotel_AttributeViewSet(viewsets.ModelViewSet):
    queryset = Hotel_Attribute.objects.all()
    serializer_class = Hotel_AttributeSerializer

    @action(detail=False, methods=['post', 'get', 'put'])
    def getHotelFilters(self, request):
        filters = Hotel_Attribute.objects.all()
        filter_list = []
        for f in filters:
            myList = {'id':f.attribute_id, 'checked':False, 'label': f.attribute_name}
            filter_list.append(myList)
        print(filter_list)
        return Response(filter_list)



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
