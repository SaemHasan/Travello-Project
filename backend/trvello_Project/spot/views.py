from datetime import date, timedelta
from django.views.generic import ListView
from django.contrib.auth.models import User
from rest_framework.decorators import action
from rest_framework.response import Response
import json

from .models import Place, Spot, SpotType_Table, PlaceRatingInfo, Spot_Type, \
    User_Spot, Spot_Food, Spot_Activity, SpotRatingInfo, User_Place, Review_Place, Review_Spot, SpotVisitCount
from .serializers import PlaceSerializer, SpotSerializer, SpotTypeSerializer, PlaceRatingInfoSerializer, \
    SpotType_TableSerializer, User_SpotSerializer, Spot_FoodSerializer, Spot_ActivitySerializer, \
    SpotRatingInfoSerializer, User_PlaceSerializer, ReviewPlaceSerializer, ReviewSpotSerializer, SpotVisitCountSerializer
from rest_framework import viewsets


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
    def getFoodsFromSpotIDs(self, request):
        spot_ids = request.data['spot_ids']
        res = []
        for id in spot_ids:
            spot = Spot.objects.get(spot_id=id)
            foods = Spot_Food.objects.all().filter(spot_id=spot)
            foods_list = []
            for i in foods:
                foods_list.append(i.food_id.food_name)
            res.append({'name': spot.name, 'foods': foods_list})

        print(res)
        return Response(res)

    @action(detail=False, methods=['post', 'get', 'put'])
    def getTopVisitedSpots(self, request):
        user_spot = User_Spot.objects.all()
        visited_spot_count = {}
        for i in user_spot:
            if i.spot_id.name in visited_spot_count:
                visited_spot_count[i.spot_id.name] = visited_spot_count[i.spot_id.name] + 1
            else:
                visited_spot_count[i.spot_id.name] = 1

        # print(visited_spot_count)
        sorted_visited_spot_count = sorted(visited_spot_count.items(), key=lambda x: x[1], reverse=True)

        if (sorted_visited_spot_count.__len__() > 5):
            sorted_visited_spot_count = sorted_visited_spot_count[:5]

        print(sorted_visited_spot_count)
        return Response(sorted_visited_spot_count)

    @action(detail=False, methods=['post', 'get', 'put'])
    def getSearchResult(self, request):
        keyword = request.data['keyword']
        location = request.data['location']

        places = Spot.objects.all()
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
        return Response(SpotSerializer(result, many=True).data)

    def getRecommenedSpots(self, user_id):
        user_spot = User_Spot.objects.all().filter(user_id=user_id)
        # print(user_spot)

        visited_spot_list = []
        for i in user_spot:
            visited_spot_list.append(i.spot_id)

        visited_spot_types = []
        visited_spot_type_ids = []
        for i in visited_spot_list:
            types = Spot_Type.objects.all().filter(spot_id=i)
            for j in types:
                visited_spot_types.append(j.type_id.type_name)
                visited_spot_type_ids.append(j.type_id.type_id)

        # print(visited_spot_types)

        recommendation_spot_list = []
        for i in visited_spot_type_ids:
            related_spots = Spot_Type.objects.all().filter(type_id=i)
            for j in related_spots:
                if j.spot_id not in visited_spot_list and j.spot_id not in recommendation_spot_list:
                    recommendation_spot_list.append(j.spot_id)

        return recommendation_spot_list

    @action(detail=False, methods=['post', 'get', 'put'])
    def getRecommendatioByUserInterest(self, request):
        token = request.data['token']
        user_id = User.objects.get(auth_token=token).id
        interests = request.data['interests']
        user_spot = User_Spot.objects.all().filter(user_id=user_id)
        # print(user_spot)

        visited_spot_list = []
        for i in user_spot:
            visited_spot_list.append(i.spot_id)

        spots = Spot.objects.all()
        recommendation_spot_list = self.getRecommenedSpots(user_id)
        # for i in visited_spot_list:
        # spots = spots.exclude(spot_id=i.spot_id)
        recommended_spots = []
        for spot in spots:
            types = Spot_Type.objects.all().filter(spot_id=spot.spot_id)
            for type in types:
                # print("type : ", type)
                # print("interests : ", interests)
                if type.type_id.type_name in interests and spot not in visited_spot_list and spot not in recommendation_spot_list:
                    recommended_spots.append(spot)
                    break
        return Response(SpotSerializer(recommended_spots, many=True).data)

    @action(detail=False, methods=['post', 'get', 'put'])
    def getUserVisitedSpots(self, request):
        token = request.data['token']
        user_id = User.objects.get(auth_token=token).id
        user_spot = User_Spot.objects.all().filter(user_id=user_id)
        spot_list = []
        for i in user_spot:
            spot = Spot.objects.get(spot_id=i.spot_id.spot_id)
            spot_list.append(spot)

        return Response(SpotSerializer(spot_list, many=True).data)

    @action(detail=False, methods=['post', 'get', 'put'])
    def getRecommendationByUserVisitedSpot(self, request):
        token = request.data['token']
        user_id = User.objects.get(auth_token=token).id

        recommendation_spot_list = self.getRecommenedSpots(user_id)
        # print(recommendation_spot_list)
        return Response(SpotSerializer(recommendation_spot_list, many=True).data)
        # return Response(User_SpotSerializer(user_spot, many=True).data)

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
        # print(food_name_list)

        # print(food_dict)
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
            # food_name_list.append(i.food_id.food_name)

        # print(spots)

        # print(food)
        # my_list = {'id_list': food_id_list, 'name_list': food_name_list}
        # food_dict.append(my_list)
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


class SpotVisitCountViewSet(viewsets.ModelViewSet):
    queryset = SpotVisitCount.objects.all()
    serializer_class = SpotVisitCountSerializer

    @action(detail=False, methods=['post', 'get', 'put'])
    def updateVisitCount(self, request):
        spot_id = int(request.data['spot_id'])
        spot = Spot.objects.get(spot_id=spot_id)
        if(SpotVisitCount.objects.filter(spot_id=spot, date=date.today()).exists()):
            visit_count = SpotVisitCount.objects.get(spot_id=spot, date=date.today())
        else:
            visit_count = SpotVisitCount(spot_id=spot, date=date.today())
        visit_count.count += 1
        visit_count.save()
        print(visit_count)
        return Response("Success")

    @action(detail=False, methods=['post', 'get', 'put'])
    def getTopVisitedSpotsOfToday(self, request):
        today = date.today()
        spots = SpotVisitCount.objects.filter(date=today).order_by('-count')[:5]
        # print(spots)
        spot_list = []
        for spot in spots:
            spot_list.append({'name': spot.spot_id.name, 'count': spot.count})
        print(spot_list)
        return Response(spot_list)

    @action(detail=False, methods=['post', 'get', 'put'])
    def getTopVisitedSpotsOfWeek(self, request):
        today = date.today()
        spots = SpotVisitCount.objects.filter(date__range=[today - timedelta(days=7), today]).order_by('-count')
        print(spots)
        spots_name_list = []
        spot_list = []
        for spot in spots:
            if spot.spot_id.name not in spots_name_list:
                spots_name_list.append(spot.spot_id.name)
                spot_list.append({'name': spot.spot_id.name, 'count': spot.count})
            else:
                spot_list[spots_name_list.index(spot.spot_id.name)]['count'] += spot.count

        sorted_spot_list = sorted(spot_list, key=lambda k: k['count'], reverse=True)
        if len(sorted_spot_list) > 5:
            spot_list = sorted_spot_list[:5]
        return Response(spot_list)

    @action(detail=False, methods=['post', 'get', 'put'])
    def getVisitHistoryOfASpot(self, request):
        spot_id = int(request.data['spot_id'])
        spot = Spot.objects.get(spot_id=spot_id)
        visits = SpotVisitCount.objects.filter(spot_id=spot).order_by('-date')[:7]
        # print(visits)
        visit_list = []
        for visit in visits:
            visit_list.append({'date': visit.date, 'count': visit.count})
        print(visit_list)
        return Response(visit_list)
