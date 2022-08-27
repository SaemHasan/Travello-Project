from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Hotel, Hotel_Attribute, Hotel_Attribute_Table, \
    HotelRatingInfo, Room, RoomPriceInfo, Room_Attribute, Room_Attribute_Table, MISC_Detail
from .serializers import HotelSerializer, Hotel_AttributeSerializer, Hotel_Attribute_TableSerializer, \
    HotelRatingInfoSerializer, RoomSerializer, RoomPriceInfoSerializer, Room_AttributeSerializer, \
    Room_Attribute_TableSerializer, MISC_DetailSerializer
# seed the pseudorandom number generator
from random import seed
from random import random
from random import randint

# Create your views here.

class HotelViewSet(viewsets.ModelViewSet):
    queryset = Hotel.objects.all()
    serializer_class = HotelSerializer

    @action(detail=False, methods=['post', 'get', 'put'])
    def getOneHotel(self, request):
        hotel_id = int(request.data['hotel_id'])
        hotel = Hotel.objects.all().filter(hotel_id=hotel_id)
        print(hotel)
        # print(hotel_atb)
        return Response(HotelSerializer(hotel, many=True).data)

    # @action(detail=False, methods=['post', 'get', 'put'])
    # def getAllHotels(self, request):
    #     spot_id = int(request.data['spot_id'])
    #     #activity = Spot_Activity.objects.get(spot_id = spot_id)
    #     hotel = Hotel.objects.all().filter(spot_id_id = spot_id)
    #
    #     # for i in food:
    #     #     food_id_list.append(i.food_id.food_id)
    #     print("Hereeeee")
    #
    #
    #     print(hotel)
    #     #return Response(food_id_list)
    #
    #     return Response(HotelSerializer(hotel, many=True).data)
    @action(detail=False, methods=['post', 'get', 'put'])
    def getAllHotels(self, request):
        hotel_list = []
        spot_id = int(request.data['spot_id'])
        hotel = Hotel.objects.all().filter(spot_id=spot_id)
        # final_food_list = []
        # activity = Spot_Activity.objects.get(spot_id = spot_id)
        for h in hotel:
            # print(food_id[f])
            hotel_atb = Hotel_Attribute_Table.objects.all().filter(hotel_id_id=h.hotel_id)
            # print(hotel_atb)
            atb_list = []
            for atb in hotel_atb:
                atb_list.append(atb.attribute_id.attribute_name.lower())

            hotel_misc = MISC_Detail.objects.all().filter(hotel_id=h.hotel_id)

            misc_list = []
            for misc in hotel_misc:
                mystr = str(misc.name) + " is " + str(misc.distance) + " KM away."
                misc_list.append(mystr)

            #print(misc_list)
            myList = {'id': h.hotel_id, 'title': h.name, 'desc': h.short_description,
                      'coverSrc': str(h.image), 'place': atb_list, 'rating': h.rating, 'misc':misc_list}
            hotel_list.append(myList)

        # print(hotel_list)
        return Response(hotel_list)

    @action(detail=False, methods=['post', 'get', 'put'])
    def getOneHotelMisc(self, request):
        hotel_id = int(request.data['hotel_id'])
        hotel_misc = MISC_Detail.objects.all().filter(hotel_id=hotel_id)
        misc_list = []
        misc_dict = []
        for misc in hotel_misc:
            mystr = str(misc.name) + " is " + str(misc.distance) + " KM away."
            misc_list.append({'misc':mystr})


        return Response(misc_list)

    @action(detail=False, methods=['post', 'get', 'put'])
    def getHotelMIscofSpot(self, request):
        spot_id = int(request.data['spot_id'])
        hotel = Hotel.objects.all().filter(spot_id=spot_id)

        rand_distance = randint(1, 200)
        print(rand_distance)
        misc_list = []
        for hotels in hotel:
            #print(hotels.hotel_id)
            hotel_misc = MISC_Detail.objects.all().filter(hotel_id=hotels.hotel_id)
            misc_dict = []
            for misc in hotel_misc:
                #mystr = str(misc.name) + " is " + str(misc.distance) + " KM away."
                misc_list.append({'misc_name': str(misc.name), 'distance': str(round(misc.distance*1.25,2))})

        print(misc_list)
        # print(hotel_atb)
        return Response(misc_list)

class Hotel_AttributeViewSet(viewsets.ModelViewSet):
    queryset = Hotel_Attribute.objects.all()
    serializer_class = Hotel_AttributeSerializer

    @action(detail=False, methods=['post', 'get', 'put'])
    def getHotelFilters(self, request):
        filters = Hotel_Attribute.objects.all()
        filter_list = []
        for f in filters:
            myList = {'id': f.attribute_id, 'checked': False, 'label': f.attribute_name}
            filter_list.append(myList)
        # print(filter_list)
        return Response(filter_list)


class Hotel_Attribute_TableViewSet(viewsets.ModelViewSet):
    queryset = Hotel_Attribute_Table.objects.all()
    serializer_class = Hotel_Attribute_TableSerializer

    @action(detail=False, methods=['post', 'get', 'put'])
    def getOneHotelAttribute(self, request):
        hotel_id = int(request.data['hotel_id'])
        hotel_atb = Hotel_Attribute_Table.objects.all().filter(hotel_id=hotel_id)
        atb_list = []
        for atb in hotel_atb:
            l = {'atb_id': atb.attribute_id.attribute_id, 'name': atb.attribute_id.attribute_name}
            # atb_list.append(atb.attribute_id.attribute_name)
            atb_list.append(l)

        print(hotel_atb)
        return Response(atb_list)


class HotelRatingInfoViewSet(viewsets.ModelViewSet):
    queryset = HotelRatingInfo.objects.all()
    serializer_class = HotelRatingInfoSerializer


class RoomViewSet(viewsets.ModelViewSet):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

    @action(detail=False, methods=['post', 'get', 'put'])
    def getRooms(self, request):
        hotel_id = int(request.data['hotel_id'])
        room = Room.objects.all().filter(hotel_id=hotel_id)
        rooms = []

        for r in room:
            atb = Room_Attribute_Table.objects.all().filter(room_id=r.room_id)
            l = []
            for a in atb:
                l.append({'id': a.attribute_id.attribute_id, 'name': a.attribute_id.attribute_name, 'value': a.value})
            ml = {'id': r.room_id, 'room_no': r.room_no, 'room_type': r.room_type, 'room_atb': l}
            rooms.append(ml)

        # print(rooms)
        # print(hotel_atb)
        return Response(rooms)


class RoomPriceInfoViewSet(viewsets.ModelViewSet):
    queryset = RoomPriceInfo.objects.all()
    serializer_class = RoomPriceInfoSerializer


class Room_AttributeViewSet(viewsets.ModelViewSet):
    queryset = Room_Attribute.objects.all()
    serializer_class = Room_AttributeSerializer


class Room_Attribute_TableViewSet(viewsets.ModelViewSet):
    queryset = Room_Attribute_Table.objects.all()
    serializer_class = Room_Attribute_TableSerializer


class MISC_DetailViewSet(viewsets.ModelViewSet):
    queryset = MISC_Detail.objects.all()
    serializer_class = MISC_DetailSerializer
