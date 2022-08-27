from django.contrib import admin
from .models import UserProfile_Interests, User_Type, UserLogginCount
# Register your models here.

admin.site.register(UserProfile_Interests)
admin.site.register(User_Type)
admin.site.register(UserLogginCount)
