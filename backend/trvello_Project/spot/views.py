from django.views.generic import ListView
from rest_framework.decorators import action
from rest_framework.response import Response
import json

from .models import Place, Spot, SpotType_Table, PlaceRatingInfo, Spot_Type, \
    User_Spot, Spot_Food, Spot_Activity, SpotRatingInfo, Review_Place, User_Place, Review_Spot
from .serializers import PlaceSerializer, SpotSerializer, SpotTypeSerializer, PlaceRatingInfoSerializer, \
    SpotType_TableSerializer, User_SpotSerializer, Spot_FoodSerializer, Spot_ActivitySerializer, \
    SpotRatingInfoSerializer, ReviewPlaceSerializer, User_PlaceSerializer, ReviewSpotSerializer
from rest_framework import viewsets


# from activity.models import Activity


# import sys
# sys.path.append("..")
# from ..food.models import Food_Type

# sys.path.append('/backend/trvello_Project')
# from food.models import Food_Type


class PlaceViewSet(viewsets.ModelViewSet):
    queryset = Place.objects.all()
    # print(queryset)
    serializer_class = PlaceSerializer

    @action(detail=False, methods=['post', 'get', 'put'])
    def getTopPlaces(self, request):
        number = int(request.data['number'])
        places = Place.objects.order_by('-rating')[:number]
        # print(places)
        return Response(PlaceSerializer(places, many=True).data)

    @action(detail=False, methods=['post', 'get', 'put'])
    def getOnePlacebyID(self, request):
        place_id = int(request.data['place_id'])
        place = Place.objects.all().filter(place_id=place_id)

        # print(place)
        return Response(SpotSerializer(place, many=True).data)

    @action(detail=False, methods=['post', 'get', 'put'])
    def getSearchResult(self, request):
        keyword = request.data['keyword']
        location = request.data['location']

        places = Place.objects.all()
        result = ""
        if (keyword != ''):
            places1 = places.filter(short_description__icontains=keyword)
            # print(places1)
            result = places1
        if (location != ''):
            places2 = places.filter(short_description__icontains=location)
            # print(places2)
            if result == "":
                result = places2
            else:
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
        number = int(request.data['spotsLength'])
        # print("spot length")
        # print(number)
        places = Place.objects.all()
        place_list = []
        number = number + 1
        for i in places:
            myList = {'id': number, 'title': i.name,
                      'category': "place", 'coverSrc': str(i.image), 'rating': i.rating, 'place_id': i.place_id,
                      'desc': i.short_description}
            number = number + 1
            # print(i.image)
            place_list.append(myList)
        # print(place_list)
        # print(places)
        return Response(place_list)


class SpotViewSet(viewsets.ModelViewSet):
    queryset = Spot.objects.all()
    serializer_class = SpotSerializer

    @action(detail=False, methods=['post', 'get', 'put'])
    def getTopSpots(self, request):
        number = int(request.data['number'])
        spots = Spot.objects.order_by('-rating')[:number]
        activity = Spot_Activity.objects.all()
        # print(activity)
        # for i in activity:
        #     print(i.activity_id.activity_name)
        #     print(i.activity_id.type)
        #     print(i.activity_id.description)
        # print(spots)
        return Response(SpotSerializer(spots, many=True).data)

    @action(detail=False, methods=['post', 'get', 'put'])
    def getOneSpotbyID(self, request):
        spot_id = int(request.data['spot_id'])
        spot = Spot.objects.all().filter(spot_id=spot_id)

        # print(spot)
        return Response(SpotSerializer(spot, many=True).data)

    @action(detail=False, methods=['post', 'get', 'put'])
    def getAllSpot(self, request):  # spots of a place
        # activity = Spot_Activity.objects.get(spot_id = spot_id)
        sopt_list = Spot.objects.all()
        # activity = Activity.activity_name
        return Response(SpotSerializer(sopt_list, many=True).data)

    @action(detail=False, methods=['post', 'get', 'put'])
    def getSpotsByPlaceID(self, request):  # spots of a place

        p_id = int(request.data['place_id'])
        # print(p_id)
        # activity = Spot_Activity.objects.get(spot_id = spot_id)
        sopt_list = Spot.objects.all().filter(place_id_id=p_id)
        # activity = Activity.activity_name

        # print(p_id)
        return Response(SpotSerializer(sopt_list, many=True).data)

    @action(detail=False, methods=['post', 'get', 'put'])
    def getAllSpots(self, request):  # all spots from database
        # place_id = int(request.data['place_id'])
        # activity = Spot_Activity.objects.get(spot_id = spot_id)
        spot = Spot.objects.all()
        spot_list = []

        for i in spot:
            myList = {'id': i.spot_id, 'title': i.name,
                      'category': "spot", 'coverSrc': str(i.image), 'rating': i.rating, 'place_id': i.place_id.place_id,
                      'desc': i.short_description, 'place_name': i.place_id.name}
            # print(i.activity_id.activity_name)
            # print(i.activity_id.type)
            # print(i.activity_id.description)
            # print(i.image)
            spot_list.append(myList)
        # print(spot_list)
        # print(spot)

        return Response(spot_list)

    @action(detail=False, methods=['post', 'get', 'put'])
    def getOneSpotActivities_search(self, request):
        location = request.data['location']

        places = Spot.objects.all()
        result = ""
        if (location != ''):
            places2 = places.filter(short_description__icontains=location)
            activities = Spot_Activity.objects.all().filter(spot_id__in=places2)
            print(activities)
            # print(places2)
            result = activities
        # print(result)
        return Response(Spot_ActivitySerializer(result, many=True).data)


    @action(detail=False, methods=['post', 'get', 'put'])
    def getOneSpotFoods_search(self, request):
        location = request.data['location']

        places = Spot.objects.all()
        result = ""
        if (location != ''):
            places2 = places.filter(short_description__icontains=location)
            foods = Spot_Food.objects.all().filter(spot_id__in=places2)
            print(foods)
            # print(places2)
            result = foods
        # print(result)
        return Response(Spot_FoodSerializer(result, many=True).data)


class SpotTypeTableViewSet(viewsets.ModelViewSet):
    queryset = SpotType_Table.objects.all()
    serializer_class = SpotType_TableSerializer

    @action(detail=False, methods=['post', 'get', 'put'])
    def getSpotTypeNames(self, request):
        # number = int(request.data['number'])
        spotTypes = SpotType_Table.objects.all()
        # print(spotTypes)
        spot_type_name = []

        for i in spotTypes:
            spot_type_name.append(i.type_name)

        # print(spot_type_name)

        id = 1
        place_filter_list = []
        for i in spot_type_name:
            myList = {'id': id, 'checked': False, 'label': i}
            id = id + 1
            place_filter_list.append(myList)
        # print(place_filter_list)
        return Response(place_filter_list)


class SpotTypeViewSet(viewsets.ModelViewSet):
    queryset = Spot_Type.objects.all()
    serializer_class = SpotTypeSerializer

    @action(detail=False, methods=['post', 'get', 'put'])
    def getAllSpotTypeExplore(self, request):
        spot_id = int(request.data['spot_id'])
        spot = Spot_Type.objects.all().filter(spot_id=spot_id)
        # activity = Activity.activity_name
        # print(activity)
        spot_list = []

        for i in spot:
            spot_list.append(i.type_id.type_name.lower())
        # print(spot_list)
        # print(spot)
        return Response(spot_list)


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
        # activity = Spot_Activity.objects.get(spot_id = spot_id)
        food = Spot_Food.objects.all().filter(spot_id=spot_id)
        food_id_list = []
        food_name_list = []
        # print(type(food))
        food_dict = []
        for i in food:
            food_id_list.append(i.food_id.food_id)
            food_name_list.append(i.food_id.food_name)

        # print(spots)

        # print(food)
        my_list = {'id_list': food_id_list, 'name_list': food_name_list}
        food_dict.append(my_list)
        #print(food_name_list)


        #print(food_dict)
        return Response(food_dict)

    @action(detail=False, methods=['post', 'get', 'put'])
    def getAllFoodComparison(self, request):
        spot_id = int(request.data['spot_id'])
        # activity = Spot_Activity.objects.get(spot_id = spot_id)
        food = Spot_Food.objects.all().filter(spot_id=spot_id)
        food_id_list = []
        food_name_list = []
        # print(type(food))
        food_dict = []
        for i in food:
            food_id_list.append(i.food_id.food_id)
            #food_name_list.append(i.food_id.food_name)

        # print(spots)

        # print(food)
        #my_list = {'id_list': food_id_list, 'name_list': food_name_list}
        #food_dict.append(my_list)
        # print(food_name_list)

        # print(food_dict)
        return Response(food_id_list)


class Spot_ActivityViewSet(viewsets.ModelViewSet):
    queryset = Spot_Activity.objects.all()
    serializer_class = Spot_ActivitySerializer

    @action(detail=False, methods=['post', 'get', 'put'])
    def getAllActivity(self, request):
        spot_id = int(request.data['spot_id'])
        # activity = Spot_Activity.objects.get(spot_id = spot_id)
        activity = Spot_Activity.objects.all().filter(spot_id=spot_id)
        # activity = Activity.activity_name
        # print(activity)
        activity_list = []

        for i in activity:
            myList = {'id': i.activity_id.activity_id, 'title': i.activity_id.activity_name,
                      'activity': i.activity_id.type.lower(), 'coverSrc': str(i.activity_id.image),
                      'desc': i.activity_id.description}
            # print(i.activity_id.activity_name)
            # print(i.activity_id.type)
            # print(i.activity_id.description)
            # print(i.activity_id.image)
            activity_list.append(myList)
        # print(activity_list)
        # print(activity)

        return Response(activity_list)

    @action(detail=False, methods=['post', 'get', 'put'])
    def getAllActivityExplore(self, request):
        spot_id = int(request.data['spot_id'])
        activity = Spot_Activity.objects.all().filter(spot_id=spot_id)
        # activity = Activity.activity_name
        # print(activity)
        activity_list = []

        for i in activity:
            activity_list.append(i.activity_id.activity_name.lower())
        # print(activity_list)
        # print(activity)
        return Response(activity_list)


class SpotRatingInfoViewSet(viewsets.ModelViewSet):
    queryset = SpotRatingInfo.objects.all()
    serializer_class = SpotRatingInfoSerializer


class ReviewPlaceViewSet(viewsets.ModelViewSet):
    queryset = Review_Place.objects.all()
    serializer_class = ReviewPlaceSerializer

    @action(detail=False, methods=['post', 'get', 'put'])
    def getReview(self, request):
        place_id = int(request.data['place_id'])
        place = Place.objects.get(place_id=place_id)
        reviews = Review_Place.objects.filter(place=place)
        # print(reviews)
        return Response(ReviewPlaceSerializer(reviews, many=True).data)


class ReviewSpotViewSet(viewsets.ModelViewSet):
    queryset = Review_Spot.objects.all()
    serializer_class = ReviewSpotSerializer


    @action(detail=False, methods=['post', 'get', 'put'])
    def getReview(self, request):
        spot_id = int(request.data['place_id'])
        spot = Spot.objects.get(spot_id=spot_id)
        reviews = Review_Spot.objects.filter(spot=spot)
        # print(reviews)
        return Response(ReviewSpotSerializer(reviews, many=True).data)


class UserPlaceViewSet(viewsets.ModelViewSet):
    queryset = User_Place.objects.all()
    serializer_class = User_PlaceSerializer
