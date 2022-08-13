from rest_framework import serializers
from .models import Food, Restaurant, Food_Restaurant, FoodPriceInfo, FoodRatingInfo, \
    FoodType_Table, Food_Type, Review_Food


class FoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = Food
        fields = '__all__'


class RestaurantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurant
        fields = '__all__'


class Food_RestaurantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Food_Restaurant
        fields = '__all__'


class FoodPriceInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = FoodPriceInfo
        fields = '__all__'


class FoodRatingInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = FoodRatingInfo
        fields = '__all__'


class FoodType_TableSerializer(serializers.ModelSerializer):
    class Meta:
        model = FoodType_Table
        fields = '__all__'


class Food_TypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Food_Type
        fields = '__all__'


class ReviewFoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review_Food
        fields = '__all__'
