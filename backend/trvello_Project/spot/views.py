from .models import Place, Spot, SpotType_Table, PlaceRatingInfo, Spot_Type, \
    User_Spot, Spot_Food, Spot_Activity, SpotRatingInfo
from .serializers import PlaceSerializer, SpotSerializer, SpotTypeSerializer, PlaceRatingInfoSerializer, \
    SpotType_TableSerializer, User_SpotSerializer, Spot_FoodSerializer, Spot_ActivitySerializer, SpotRatingInfoSerializer
from rest_framework import viewsets


class PlaceViewSet(viewsets.ModelViewSet):
    queryset = Place.objects.all()
    # print(queryset)
    serializer_class = PlaceSerializer

class SpotViewSet(viewsets.ModelViewSet):
    queryset = Spot.objects.all()
    serializer_class = SpotSerializer

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