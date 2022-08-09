from django.views.generic import ListView
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Place, Spot, SpotType_Table, PlaceRatingInfo, Spot_Type, \
    User_Spot, Spot_Food, Spot_Activity, SpotRatingInfo, Review
from .serializers import PlaceSerializer, SpotSerializer, SpotTypeSerializer, PlaceRatingInfoSerializer, \
    SpotType_TableSerializer, User_SpotSerializer, Spot_FoodSerializer, Spot_ActivitySerializer, \
    SpotRatingInfoSerializer, ReviewSerializer
from rest_framework import viewsets


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


class SpotViewSet(viewsets.ModelViewSet):
    queryset = Spot.objects.all()
    serializer_class = SpotSerializer

    @action(detail=False, methods=['post', 'get', 'put'])
    def getTopSpots(self, request):
        number = int(request.data['number'])
        spots = Spot.objects.order_by('-rating')[:number]
        print(spots)
        return Response(SpotSerializer(spots, many=True).data)


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


class Spot_ActivityViewSet(viewsets.ModelViewSet):
    queryset = Spot_Activity.objects.all()
    serializer_class = Spot_ActivitySerializer


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
