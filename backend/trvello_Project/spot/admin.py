from django.contrib import admin
from .models import Spot, Place, PlaceRatingInfo, SpotType_Table, Spot_Type, User_Spot, Spot_Food, Spot_Activity, \
     User_Place, Review_Place, Review_Spot, SpotVisitCount

# Register your models here.
admin.site.register(Spot)
admin.site.register(Place)
admin.site.register(PlaceRatingInfo)
admin.site.register(SpotType_Table)
admin.site.register(Spot_Type)
admin.site.register(User_Spot)
admin.site.register(Spot_Food)
admin.site.register(Spot_Activity)
admin.site.register(User_Place)
admin.site.register(Review_Place)
admin.site.register(Review_Spot)
admin.site.register(SpotVisitCount)
