from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response


from .serializers import ActivitySerializer, AgencySerializer, ActivityType_TableSerializer, Activity_AgencySerializer, \
    ActivityPriceInfoSerializer, ActivityRatingInfoSerializer
from .models import Activity, Agency, ActivityType_Table, Activity_Agency, ActivityPriceInfo, ActivityRatingInfo


# Create your views here.


class ActivityViewSet(viewsets.ModelViewSet):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer

    @action(detail=False, methods=['post', 'get', 'put'])
    def getTopActivities(self, request):
        number = int(request.data['number'])
        activities = Activity.objects.all()[:number]
        print(activities)
        return Response(ActivitySerializer(activities, many=True).data)

    @action(detail=False, methods=['post', 'get', 'put'])
    def getActivityFromid(self, request):
        ids = request.data['id']
        result = []
        for id in ids:
            activity = Activity.objects.get(activity_id=id)
            result.append(activity.activity_name)
        print(result)
        return Response(result)

    @action(detail=False, methods=['post', 'get', 'put'])
    def getActivitiesNames(self, request):
        #number = int(request.data['number'])
        activities = Activity.objects.all()
        print(activities)
        activities_name = []
        unique_activity_name = []

        for i in activities:
            activities_name.append(i.activity_name)

        for x in activities_name:
            if x not in unique_activity_name:
                unique_activity_name.append(x)
        print(activities_name)
        print(unique_activity_name)
        activity_filter_list = []

        id=1
        for i in unique_activity_name:
            myList = {'id': id, 'checked': False, 'label': i}
            id = id + 1
            activity_filter_list.append(myList)
        print(activity_filter_list)
        return Response(activity_filter_list)




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
            myList = {'id':f.type_id, 'checked':False, 'label': f.type_name}
            filter_list.append(myList)
        return Response(filter_list)


class Activity_AgencyViewSet(viewsets.ModelViewSet):
    queryset = Activity_Agency.objects.all()
    serializer_class = Activity_AgencySerializer


class ActivityPriceInfoViewSet(viewsets.ModelViewSet):
    queryset = ActivityPriceInfo.objects.all()
    serializer_class = ActivityPriceInfoSerializer


class ActivityRatingInfoViewSet(viewsets.ModelViewSet):
    queryset = ActivityRatingInfo.objects.all()
    serializer_class = ActivityRatingInfoSerializer
