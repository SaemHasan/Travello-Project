from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Food, Restaurant, Food_Restaurant, FoodPriceInfo, \
    FoodRatingInfo, FoodType_Table, Food_Type
from .serializers import FoodSerializer, RestaurantSerializer, Food_RestaurantSerializer, \
    FoodPriceInfoSerializer, FoodRatingInfoSerializer, FoodType_TableSerializer, Food_TypeSerializer


# Create your views here.

class FoodViewSet(viewsets.ModelViewSet):
    queryset = Food.objects.all()
    serializer_class = FoodSerializer

    @action(detail=False, methods=['post', 'get', 'put'])
    def getTopFoods(self, request):
        number = int(request.data['number'])
        foods = Food.objects.all()[:number]
        # print(foods)
        return Response(FoodSerializer(foods, many=True).data)

    @action(detail=False, methods=['post', 'get', 'put'])
    def getFoodDetails(self, request):
        food_id_list = request.data['food_id_list']
        foods = Food.objects.all()
        print("=====================================================")
        #print(food_id_list)
        print("=====================================================")
        return Response(FoodSerializer(foods, many=True).data)

    @action(detail=False, methods=['post', 'get', 'put'])
    def getFoodFromIds(self, request):
        ids = request.data['id']
        foods = Food.objects.filter(food_id__in=ids)
        foods_name = [food.food_name for food in foods]
        return Response(foods_name)


class RestaurantViewSet(viewsets.ModelViewSet):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantSerializer

    @action(detail=False, methods=['post', 'get', 'put'])
    def getRestaurantFromIds(self, request):
        ids = request.data['id']
        restaurants = Restaurant.objects.filter(restaurant_id__in=ids)
        restaurants_name = [restaurant.restaurant_name for restaurant in restaurants]
        return Response(restaurants_name)


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

    def get_food(self):
        return Food_Type.objects.all()

