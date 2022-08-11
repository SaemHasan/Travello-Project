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

    @action(detail=False, methods=['post', 'get', 'put'])
    def getFoodFilters(self, request):
        filters = FoodType_Table.objects.all()
        filter_list = []
        for f in filters:
            myList = {'id': f.type_id, 'checked': False, 'label': f.type_name}
            filter_list.append(myList)
        return Response(filter_list)


class Food_TypeViewSet(viewsets.ModelViewSet):
    queryset = Food_Type.objects.all()
    serializer_class = Food_TypeSerializer

    @action(detail=False, methods=['post', 'get', 'put'])
    def getFoodTypes(self, request):
        food_id = request.data['foods']
        final_food_list = []
        # activity = Spot_Activity.objects.get(spot_id = spot_id)
        for f in range(len(food_id)):
            print(food_id[f])
            food = Food.objects.all().filter(food_id=food_id[f])
            print(food)
            for k in food:
            #food2 = Food.objects.all().filter(food_id=food_id[1])
            #food = food1.expand(food2)
            #final_food_list = []
            #print(type(food))
                #for type_id in foo
                food_type = Food_Type.objects.all().filter(food_id=food_id[f])
                type_list = []
                for t in food_type:
                    print(t)
                    type_list.append(t.type_id.type_name.lower())
                    #print(food_type[1])
                print(type_list)
                myList = {'id': k.food_id, 'title': k.food_name, 'desc': k.short_description,
                  'coverSrc': str(k.image), 'food':type_list}
                final_food_list.append(myList)
        #     # food_type = Food_Type.Food_Type.get_food()
        #     #print(i.food_id.food_name)
        #     #print(i.food_id.short_description)
        #     print("In food type")
        #     print(myList)
        #     food_id_list.append(myList)
        # # print(spots)

        print(final_food_list)
        return Response(final_food_list)

