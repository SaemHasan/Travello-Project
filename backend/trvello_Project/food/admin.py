from django.contrib import admin
from .models import Food, Food_Type, Restaurant, Food_Restaurant, FoodPriceInfo, FoodRatingInfo, FoodType_Table
# Register your models here.

admin.site.register(Food)
admin.site.register(Food_Type)
admin.site.register(Restaurant)
admin.site.register(Food_Restaurant)
admin.site.register(FoodPriceInfo)
admin.site.register(FoodRatingInfo)
admin.site.register(FoodType_Table)