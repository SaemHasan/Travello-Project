from django.contrib import admin
from .models import Hotel, Hotel_Attribute, Hotel_Attribute_Table, HotelRatingInfo, Room, RoomPriceInfo, Room_Attribute, \
    Room_Attribute_Table, MISC_Detail

# Register your models here.

admin.site.register(Hotel)
admin.site.register(Hotel_Attribute)
admin.site.register(Hotel_Attribute_Table)
admin.site.register(HotelRatingInfo)
admin.site.register(Room)
admin.site.register(RoomPriceInfo)
admin.site.register(Room_Attribute)
admin.site.register(Room_Attribute_Table)
admin.site.register(MISC_Detail)