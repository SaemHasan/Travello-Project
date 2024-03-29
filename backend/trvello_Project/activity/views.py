from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .serializers import ActivitySerializer, AgencySerializer, ActivityType_TableSerializer, Activity_AgencySerializer, \
    ActivityPriceInfoSerializer, ActivityRatingInfoSerializer, ReviewActivitySerializer
from .models import Activity, Agency, ActivityType_Table, Activity_Agency, ActivityPriceInfo, ActivityRatingInfo, \
    Review_Activity

from math import sin, cos, sqrt, atan2, radians
# Create your views here.


class ActivityViewSet(viewsets.ModelViewSet):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer

    @action(detail=False, methods=['post', 'get', 'put'])
    def getOneActivity(self, request):
        activity_id = int(request.data['activity_id'])
        activity = Activity.objects.all().filter(activity_id=activity_id)
        # print(foods)
        return Response(ActivitySerializer(activity, many=True).data)

    @action(detail=False, methods=['post', 'get', 'put'])
    def getTopActivities(self, request):
        number = int(request.data['number'])
        activities = Activity.objects.all()[:number]
        # print(activities)
        return Response(ActivitySerializer(activities, many=True).data)

    @action(detail=False, methods=['post', 'get', 'put'])
    def getActivityFromid(self, request):
        ids = request.data['id']
        result = []
        for id in ids:
            activity = Activity.objects.get(activity_id=id)
            result.append(activity.activity_name)
        # print(result)
        return Response(result)

    @action(detail=False, methods=['post', 'get', 'put'])
    def getActivitiesNames(self, request):
        # number = int(request.data['number'])
        activities = Activity.objects.all()
        # print(activities)
        activities_name = []
        unique_activity_name = []

        for i in activities:
            activities_name.append(i.activity_name)

        for x in activities_name:
            if x not in unique_activity_name:
                unique_activity_name.append(x)
        # print(activities_name)
        # print(unique_activity_name)
        activity_filter_list = []

        id = 1
        for i in unique_activity_name:
            myList = {'id': id, 'checked': False, 'label': i}
            id = id + 1
            activity_filter_list.append(myList)
        # print(activity_filter_list)
        return Response(activity_filter_list)

    @action(detail=False, methods=['post', 'get', 'put'])
    def getSearchResult(self, request):
        keyword = request.data['keyword']
        location = request.data['location']

        activities = Activity.objects.all()
        result = ""
        if (keyword != ''):
            activities1 = activities.filter(description__icontains=keyword)
            result = activities1
        if (location != ''):
            activities2 = activities.filter(description__icontains=location)

            if result == "":
                result = activities2
            else:
                result |= activities2
        if result != "":
            result = result.distinct()
            initial_res = result
            for i in range(initial_res.count()):
                for j in range(initial_res.count()):
                    if j>i and initial_res[i].activity_name == initial_res[j].activity_name:
                        result = result.exclude(activity_id=initial_res[j].activity_id)
        # print(result)
        return Response(ActivitySerializer(result, many=True).data)


class AgencyViewSet(viewsets.ModelViewSet):
    queryset = Agency.objects.all()
    serializer_class = AgencySerializer

    @action(detail=False, methods=['post', 'get', 'put'])
    def getAgencyFromid(self, request):
        ids = request.data['id']
        result = []
        for id in ids:
            agency = Agency.objects.get(agency_id=id)
            result.append(agency.agency_name)
        return Response(result)


class ActivityType_TableViewSet(viewsets.ModelViewSet):
    queryset = ActivityType_Table.objects.all()
    serializer_class = ActivityType_TableSerializer

    @action(detail=False, methods=['post', 'get', 'put'])
    def getActivityFilters(self, request):
        filters = ActivityType_Table.objects.all()
        filter_list = []
        for f in filters:
            myList = {'id': f.type_id, 'checked': False, 'label': f.type_name}
            filter_list.append(myList)
        return Response(filter_list)


class Activity_AgencyViewSet(viewsets.ModelViewSet):
    queryset = Activity_Agency.objects.all()
    serializer_class = Activity_AgencySerializer

    @action(detail=False, methods=['post', 'get', 'put'])
    def getAgencyFromActivityID(self, request):
        activity_id = int(request.data['activity_id'])
        agency_ids = Activity_Agency.objects.all().filter(activity_id=activity_id)
        activity_name = agency_ids[0].activity_id.activity_name
        print(activity_name)
        print(agency_ids[0].agency_id.agency_id)
        print(agency_ids[0].activity_agency_id)
        price_id = []
        for i in agency_ids:
            price_id.append(ActivityPriceInfo.objects.all().filter(activity_agency_id=i.activity_agency_id))
        print(price_id[0][0].price)
        agencies = []
        x = 0
        for i in agency_ids:
            myList = {'id': i.agency_id.agency_id, 'name': i.agency_id.agency_name,
                      'email': i.agency_id.email, 'website': i.agency_id.website,
                      'phoneno': i.agency_id.phone_number, 'price': price_id[x][0].price, }
            x = x + 1
            agencies.append(myList)
        print(agencies)
        # restaurants = []
        # for i in restaurant_ids:

        # restaurants_name = [restaurant.restaurant_name for restaurant in restaurants]
        # print(restaurants.restaurant_id.restaurant_name)
        return Response(agencies)

    @action(detail=False, methods=['post', 'get', 'put'])
    def getAgencyCor(self, request):
        activity_id_list = request.data['activity_id_list']
        hotel_list_byID = request.data['hotel_list_byID']
        distance_list = []
        #print(activity_id_list)
        for h in hotel_list_byID:
            distance = 0
            for i in range(len(activity_id_list)):
                agency_ids = Activity_Agency.objects.all().filter(activity_id=activity_id_list[i])
                for ag in agency_ids:
                    distance = distance + get_distance(h["cordinate_lattitude"], h["cordinate_longitude"], ag.agency_id.cordinate_lattitude, ag.agency_id.cordinate_longitude)
            print(distance)
            distance_list.append(distance)
        min_value = min(distance_list)
        min_index = distance_list.index(min_value)

        return Response(hotel_list_byID[min_index])

    @action(detail=False, methods=['post', 'get', 'put'])
    def getAgencyCorExplore(self, request):
        activity_id_list = request.data['activity_id_list']
        hotel_list_byID = request.data['hotel_list_byID']
        distance_list = []
        # print(activity_id_list)
        for h in hotel_list_byID:
            distance = 0
            for i in range(len(activity_id_list)):
                agency_ids = Activity_Agency.objects.all().filter(activity_id=activity_id_list[i])
                for ag in agency_ids:
                    distance = distance + get_distance(h["cordinate_lattitude"], h["cordinate_longitude"],
                                                       ag.agency_id.cordinate_lattitude,
                                                       ag.agency_id.cordinate_longitude)
            print(distance)
            distance_list.append(distance)
        min_value = min(distance_list)
        min_index = distance_list.index(min_value)
        distance_dict = []
        print(hotel_list_byID[min_index])
        my_list = {"name": hotel_list_byID[min_index]["name"],}
        print(my_list)
        distance_dict.append(my_list)
        return Response(distance_dict)

class ActivityPriceInfoViewSet(viewsets.ModelViewSet):
    queryset = ActivityPriceInfo.objects.all()
    serializer_class = ActivityPriceInfoSerializer


class ActivityRatingInfoViewSet(viewsets.ModelViewSet):
    queryset = ActivityRatingInfo.objects.all()
    serializer_class = ActivityRatingInfoSerializer


class ReviewActivityViewSet(viewsets.ModelViewSet):
    queryset = Review_Activity.objects.all()
    serializer_class = ReviewActivitySerializer


def get_distance(lat1, lon1, lat2, lon2):
    R = 6373.0

    lat1 = radians(float(lat1))
    lon1 = radians(float(lon1))
    lat2 = radians(float(lat2))
    lon2 = radians(float(lon2))

    dlon = lon2 - lon1
    dlat = lat2 - lat1

    a = sin(dlat / 2) ** 2 + cos(lat1) * cos(lat2) * sin(dlon / 2) ** 2
    c = 2 * atan2(sqrt(a), sqrt(1 - a))

    distance = R * c

    print("Result:", distance)
    return distance
