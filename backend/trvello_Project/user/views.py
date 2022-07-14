from django.shortcuts import render
from rest_framework import viewsets
from .models import UserProfile_Interests, User_Type
from .serializers import UserSerializer, UserProfile_Interests_Serializer
from django.contrib.auth.models import User


# Create your views here.

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserProfileInterestsViewSet(viewsets.ModelViewSet):
    queryset = UserProfile_Interests.objects.all()
    serializer_class = UserProfile_Interests_Serializer


