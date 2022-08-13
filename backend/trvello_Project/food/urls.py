from django.urls import path, include
from .views import FoodViewSet, RestaurantViewSet, Food_RestaurantViewSet, FoodPriceInfoViewSet, FoodRatingInfoViewSet, \
    FoodType_TableViewSet, Food_TypeViewSet, ReviewFoodViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('foods', FoodViewSet, basename='foods')
router.register('restaurants', RestaurantViewSet, basename='restaurants')
router.register('food_restaurants', Food_RestaurantViewSet, basename='food_restaurants')
router.register('food_price_infos', FoodPriceInfoViewSet, basename='food_price_infos')
router.register('food_rating_infos', FoodRatingInfoViewSet, basename='food_rating_infos')
router.register('food_type_tables', FoodType_TableViewSet, basename='food_type_tables')
router.register('food_types', Food_TypeViewSet, basename='food_types')
router.register('review_foods', ReviewFoodViewSet, basename='review_foods')

urlpatterns = [
    path('api/', include(router.urls)),
]