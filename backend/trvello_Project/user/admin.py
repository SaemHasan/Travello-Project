from django.contrib import admin
from .models import UserProfile, UserProfile_Interests, User_Type
# Register your models here.

admin.site.register(UserProfile)
admin.site.register(UserProfile_Interests)
admin.site.register(User_Type)
