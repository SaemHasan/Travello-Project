from .models import Place, Spot, SpotType_Table, PlaceRatingInfo
from .serializers import PlaceSerializer, SpotSerializer, SpotTypeSerializer, PlaceRatingInfoSerializer
from rest_framework import viewsets


class PlaceViewSet(viewsets.ModelViewSet):
    queryset = Place.objects.all()
    # print(queryset)
    serializer_class = PlaceSerializer

class SpotViewSet(viewsets.ModelViewSet):
    queryset = Spot.objects.all()
    serializer_class = SpotSerializer

class TypeViewSet(viewsets.ModelViewSet):
    queryset = SpotType_Table.objects.all()
    serializer_class = SpotTypeSerializer

class PlaceRatingInfoViewSet(viewsets.ModelViewSet):
    queryset = PlaceRatingInfo.objects.all()
    serializer_class = PlaceRatingInfoSerializer