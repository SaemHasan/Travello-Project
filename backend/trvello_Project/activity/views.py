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


class Activity_AgencyViewSet(viewsets.ModelViewSet):
    queryset = Activity_Agency.objects.all()
    serializer_class = Activity_AgencySerializer


class ActivityPriceInfoViewSet(viewsets.ModelViewSet):
    queryset = ActivityPriceInfo.objects.all()
    serializer_class = ActivityPriceInfoSerializer


class ActivityRatingInfoViewSet(viewsets.ModelViewSet):
    queryset = ActivityRatingInfo.objects.all()
    serializer_class = ActivityRatingInfoSerializer
