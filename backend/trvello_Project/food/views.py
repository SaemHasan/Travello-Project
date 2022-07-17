from django.shortcuts import render
from rest_framework import viewsets

from .models import Food, Restaurant, Food_Restaurant, FoodPriceInfo, \
    FoodRatingInfo, FoodType_Table, Food_Type
from .serializers import FoodSerializer, RestaurantSerializer, Food_RestaurantSerializer, \
    FoodPriceInfoSerializer, FoodRatingInfoSerializer, FoodType_TableSerializer, Food_TypeSerializer


# Create your views here.

class FoodViewSet(viewsets.ModelViewSet):
    queryset = Food.objects.all()
    serializer_class = FoodSerializer


class RestaurantViewSet(viewsets.ModelViewSet):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantSerializer


class Food_RestaurantViewSet(viewsets.ModelViewSet):
    queryset = Food_Restaurant.objects.all()
    serializer_class = Food_RestaurantSerializer


class FoodPriceInfoViewSet(viewsets.ModelViewSet):
    queryset = FoodPriceInfo.objects.all()
    serializer_class = FoodPriceInfoSerializer


class FoodRatingInfoViewSet(viewsets.ModelViewSet):
    queryset = FoodRatingInfo.objects.all()
    serializer_class = FoodRatingInfoSerializer


class FoodType_TableViewSet(viewsets.ModelViewSet):
    queryset = FoodType_Table.objects.all()
    serializer_class = FoodType_TableSerializer


class Food_TypeViewSet(viewsets.ModelViewSet):
    queryset = Food_Type.objects.all()
    serializer_class = Food_TypeSerializer
