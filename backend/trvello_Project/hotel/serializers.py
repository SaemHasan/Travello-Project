from rest_framework import serializers
from .models import Hotel, Hotel_Attribute, Hotel_Attribute_Table, HotelRatingInfo, \
    Room, RoomPriceInfo, Room_Attribute, Room_Attribute_Table, MISC_Detail


class HotelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hotel
        fields = '__all__'


class Hotel_AttributeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hotel_Attribute
        fields = '__all__'


class Hotel_Attribute_TableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hotel_Attribute_Table
        fields = '__all__'


class HotelRatingInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = HotelRatingInfo
        fields = '__all__'


class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = '__all__'


class RoomPriceInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = RoomPriceInfo
        fields = '__all__'


class Room_AttributeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room_Attribute
        fields = '__all__'


class Room_Attribute_TableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room_Attribute_Table
        fields = '__all__'


class MISC_DetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = MISC_Detail
        fields = '__all__'
