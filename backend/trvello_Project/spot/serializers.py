from rest_framework import serializers
from .models import Place, PlaceRatingInfo, Spot, SpotType_Table, Spot_Type, User_Spot, Spot_Food, Spot_Activity, \
    SpotRatingInfo


class PlaceRatingInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlaceRatingInfo
        fields = '__all__'


class SpotSerializer(serializers.ModelSerializer):
    class Meta:
        model = Spot
        fields = '__all__'


class SpotTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Spot_Type
        fields = '__all__'


class PlaceSerializer(serializers.ModelSerializer):
    spots = SpotSerializer(many=True)

    class Meta:
        model = Place
        fields = '__all__'


class SpotType_TableSerializer(serializers.ModelSerializer):
    class Meta:
        model = SpotType_Table
        fields = '__all__'


class User_SpotSerializer(serializers.ModelSerializer):
    class Meta:
        model = User_Spot
        fields = '__all__'


class Spot_FoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = Spot_Food
        fields = '__all__'


class Spot_ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Spot_Activity
        fields = '__all__'


class SpotRatingInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = SpotRatingInfo
        fields = '__all__'
