from rest_framework import serializers
from .models import Place, PlaceRatingInfo, Spot, SpotType_Table, Spot_Type, User_Spot, Spot_Food, Spot_Activity, \
    SpotRatingInfo, User_Place, Review_Place, Review_Spot, SpotVisitCount


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


class PlaceSerializer(serializers.HyperlinkedModelSerializer):
    image = serializers.ImageField(
        max_length=None, allow_empty_file=True, allow_null=True, use_url=True, required=False, default=None)

    class Meta:
        model = Place
        fields = ['place_id', 'name', 'short_description', 'image', 'district', 'cordinate_lattitude',
                  'cordinate_longitude', 'rating']
        # fields = '__all__'


class SpotType_TableSerializer(serializers.ModelSerializer):
    class Meta:
        model = SpotType_Table
        fields = '__all__'


class User_SpotSerializer(serializers.ModelSerializer):
    class Meta:
        model = User_Spot
        fields = '__all__'


class User_PlaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = User_Place
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


class ReviewPlaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review_Place
        fields = '__all__'


class ReviewSpotSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review_Spot
        fields = '__all__'


class SpotVisitCountSerializer(serializers.ModelSerializer):
    class Meta:
        model = SpotVisitCount
        fields = '__all__'
