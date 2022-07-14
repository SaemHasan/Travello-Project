from rest_framework import serializers
from .models import Place, PlaceRatingInfo, Spot, Type, Spot_Type, User_Spot, Spot_Food, Spot_Activity


class PlaceRatingInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlaceRatingInfo
        fields = ['rating_id', 'factor', 'start_time', 'end_time']

class SpotSerializer(serializers.ModelSerializer):
    class Meta:
        model = Spot
        fields = ['spot_id' ,'name', 'short_description', 'address_line', 'district', 'thana', 'upzila', 'cordinate_lattitude', 'cordinate_longitude', 'rating']

class TypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Type
        fields = ['type_id', 'type_name', 'category']

class PlaceSerializer(serializers.ModelSerializer):
    spots = SpotSerializer(many=True)

    class Meta:
        model = Place
        fields = ['place_id', 'name', 'short_description', 'district', 'cordinate_lattitude', 'cordinate_longitude', 'rating', 'spots']
        # fields = ['place_id', 'name']
