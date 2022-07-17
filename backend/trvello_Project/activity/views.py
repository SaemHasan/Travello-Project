from django.shortcuts import render
from rest_framework import viewsets
from .serializers import ActivitySerializer, AgencySerializer, ActivityType_TableSerializer, Activity_AgencySerializer, ActivityPriceInfoSerializer, ActivityRatingInfoSerializer
from .models import Activity, Agency, ActivityType_Table, Activity_Agency, ActivityPriceInfo, ActivityRatingInfo

# Create your views here.


class ActivityViewSet(viewsets.ModelViewSet):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer

class AgencyViewSet(viewsets.ModelViewSet):
    queryset = Agency.objects.all()
    serializer_class = AgencySerializer

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
