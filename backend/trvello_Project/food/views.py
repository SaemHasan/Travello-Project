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
        print(foods)
        return Response(FoodSerializer(foods, many=True).data)

    @action(detail=False, methods=['post', 'get', 'put'])
    def getFoodDetails(self, request):
        food_id_list = request.data['food_id_list']
        foods = Food.objects.all()
        print("=====================================================")
        #print(food_id_list)
        print("=====================================================")
        return Response(FoodSerializer(foods, many=True).data)


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

    @action(detail=False, methods=['post', 'get', 'put'])
    def getFoodTypes(self, request):
        food_id = request.data['foods']
        # activity = Spot_Activity.objects.get(spot_id = spot_id)
        food = Food.objects.all().filter(food_id=food_id[0])
        #food2 = Food.objects.all().filter(food_id=food_id[1])
        #food = food1.expand(food2)
        food_id_list = []
        #print(type(food))
        for i in food:
            #for type_id in foo
            food_type = Food_Type.objects.all().filter(food_id=i.food_id)
            print(food_type[0])
            print(food_type[1])
        #     myList = {'id': i.food_id, 'title': i.food_id.food_name, 'desc': i.food_id.short_description,
        #               'coverSrc': str(i.food_id.image), 'food':food_type.type_id.type_name}
        #     # food_type = Food_Type.Food_Type.get_food()
        #     #print(i.food_id.food_name)
        #     #print(i.food_id.short_description)
        #     print("In food type")
        #     print(myList)
        #     food_id_list.append(myList)
        # # print(spots)

        #print(food)
        return Response()

