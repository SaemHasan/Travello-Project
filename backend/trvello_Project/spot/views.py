from django.views.generic import ListView
from rest_framework.decorators import action
from rest_framework.response import Response
import json


from .models import Place, Spot, SpotType_Table, PlaceRatingInfo, Spot_Type, \
    User_Spot, Spot_Food, Spot_Activity, SpotRatingInfo, Review
from .serializers import PlaceSerializer, SpotSerializer, SpotTypeSerializer, PlaceRatingInfoSerializer, \
    SpotType_TableSerializer, User_SpotSerializer, Spot_FoodSerializer, Spot_ActivitySerializer, \
    SpotRatingInfoSerializer, ReviewSerializer
from rest_framework import viewsets

#from activity.models import Activity


#import sys
#sys.path.append("..")
#from ..food.models import Food_Type

#sys.path.append('/backend/trvello_Project')
#from food.models import Food_Type



class PlaceViewSet(viewsets.ModelViewSet):
    queryset = Place.objects.all()
    # print(queryset)
    serializer_class = PlaceSerializer

    @action(detail=False, methods=['post', 'get', 'put'])
    def getTopPlaces(self, request):
        number = int(request.data['number'])
        places = Place.objects.order_by('-rating')[:number]
        print(places)
        return Response(PlaceSerializer(places, many=True).data)

    @action(detail=False, methods=['post', 'get', 'put'])
    def getSearchResult(self, request):
        keyword = request.data['keyword']
        location = request.data['location']

        places = Place.objects.all()
        result = []
        if (keyword != ''):
            places1 = places.filter(short_description__icontains=keyword)
            print(places1)
            result = places1
        if (location != ''):
            places2 = places.filter(short_description__icontains=location)
            print(places2)
            result |= places2
        # print(result)
        return Response(PlaceSerializer(result, many=True).data)

    @action(detail=False, methods=['post', 'get', 'put'])
    def getOnePlaceDetails(self, request):
        place_id = request.data['id']
        place = Place.objects.get(place_id=place_id)
        return Response(PlaceSerializer(place).data)

    @action(detail=False, methods=['post', 'get', 'put'])
    def getAllPlaces(self, request):
        #number = int(request.data['number'])
        places = Place.objects.all()
        place_list = []

        for i in places:
            myList = {'id': i.place_id, 'title': i.name,
                      'category': "place", 'coverSrc': str(i.image), 'rating': i.rating}
            # print(i.activity_id.activity_name)
            # print(i.activity_id.type)
            # print(i.activity_id.description)
            print(i.image)
            place_list.append(myList)
        print(place_list)
        print(places)
        return Response(place_list)


class SpotViewSet(viewsets.ModelViewSet):
    queryset = Spot.objects.all()
    serializer_class = SpotSerializer

    @action(detail=False, methods=['post', 'get', 'put'])
    def getTopSpots(self, request):
        number = int(request.data['number'])
        spots = Spot.objects.order_by('-rating')[:number]
        activity = Spot_Activity.objects.all()
        print(activity)
        for i in activity:
            print(i.activity_id.activity_name)
            print(i.activity_id.type)
            print(i.activity_id.description)
        print(spots)
        return Response(SpotSerializer(spots, many=True).data)

    @action(detail=False, methods=['post', 'get', 'put'])
    def getAllSpot(self, request):  #spots of a place
        place_id = int(request.data['place_id'])
        # activity = Spot_Activity.objects.get(spot_id = spot_id)
        place_id = Spot.objects.all().filter(place_id=place_id)
        # activity = Activity.activity_name

        print(place_id)
        return Response(SpotSerializer(place_id, many=True).data)

    @action(detail=False, methods=['post', 'get', 'put'])
    def getAllSpots(self, request): #all spots from database
        #place_id = int(request.data['place_id'])
        # activity = Spot_Activity.objects.get(spot_id = spot_id)
        spot = Spot.objects.all()
        spot_list = []

        for i in spot:
            myList = {'id': i.spot_id, 'title': i.name,
                      'category': "spot", 'coverSrc': str(i.image), 'rating': i.rating}
            # print(i.activity_id.activity_name)
            # print(i.activity_id.type)
            # print(i.activity_id.description)
            print(i.image)
            spot_list.append(myList)
        print(spot_list)
        print(spot)


        return Response(spot_list)


class SpotTypeTableViewSet(viewsets.ModelViewSet):
    queryset = SpotType_Table.objects.all()
    serializer_class = SpotType_TableSerializer


class SpotTypeViewSet(viewsets.ModelViewSet):
    queryset = Spot_Type.objects.all()
    serializer_class = SpotTypeSerializer


class PlaceRatingInfoViewSet(viewsets.ModelViewSet):
    queryset = PlaceRatingInfo.objects.all()
    serializer_class = PlaceRatingInfoSerializer


class User_SpotViewSet(viewsets.ModelViewSet):
    queryset = User_Spot.objects.all()
    serializer_class = User_SpotSerializer


class Spot_FoodViewSet(viewsets.ModelViewSet):
    queryset = Spot_Food.objects.all()
    serializer_class = Spot_FoodSerializer

    @action(detail=False, methods=['post', 'get', 'put'])
    def getAllFood(self, request):
        spot_id = int(request.data['spot_id'])
        #activity = Spot_Activity.objects.get(spot_id = spot_id)
        food = Spot_Food.objects.all().filter(spot_id = spot_id)
        food_id_list = []
        print(type(food))
        for i in food:
            food_id_list.append(i.food_id.food_id)
        #print(spots)


        print(food)
        return Response(food_id_list)


class Spot_ActivityViewSet(viewsets.ModelViewSet):
    queryset = Spot_Activity.objects.all()
    serializer_class = Spot_ActivitySerializer

    @action(detail=False, methods=['post', 'get', 'put'])
    def getAllActivity(self, request):
        spot_id = int(request.data['spot_id'])
        #activity = Spot_Activity.objects.get(spot_id = spot_id)
        activity = Spot_Activity.objects.all().filter(spot_id = spot_id)
        #activity = Activity.activity_name
        #print(activity)
        activity_list = []


        for i in activity:
            myList = {'id': i.activity_id.activity_id, 'title': i.activity_id.activity_name, 'activity': i.activity_id.type.lower(), 'coverSrc': str(i.activity_id.image)}
            #print(i.activity_id.activity_name)
            #print(i.activity_id.type)
            #print(i.activity_id.description)
            print(i.activity_id.image)
            activity_list.append(myList)
        print(activity_list)
        print(activity)


        return Response(activity_list)


class SpotRatingInfoViewSet(viewsets.ModelViewSet):
    queryset = SpotRatingInfo.objects.all()
    serializer_class = SpotRatingInfoSerializer


class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

    # @action(detail=False, methods=['post', 'get', 'put'])
    # def getReview(self, request):
    #     print("dhjs  djhsf")
    #     place_id = int(request.data['place_id'])
    #     place = Place.objects.get(place_id=place_id)
    #     reviews = Review.objects.filter(place=place)
    #     print(reviews)
    #     return Response(ReviewSerializer(reviews, many=True).data)
