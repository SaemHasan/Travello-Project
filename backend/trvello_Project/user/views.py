from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import UserProfile_Interests, User_Type, UserLogginCount
from .serializers import UserSerializer, UserProfile_Interests_Serializer, User_Type_Serializer, \
    UserLoginCountSerializer
from django.contrib.auth.models import User


# Create your views here.

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    @action(detail=False, methods=['post', 'get', 'put'])
    def getUserByToken(self, request):
        token = request.data['token']
        user = User.objects.get(auth_token=token)
        # print(token)
        # print(user)
        # print("here i am")
        return Response(UserSerializer(user).data)

    @action(detail=False, methods=['post', 'get', 'put'])
    def getUserInterests(self, request):
        # print("here i am")
        print(request.data)
        user = User.objects.get(auth_token=request.data['token'])
        interests = UserProfile_Interests.objects.filter(user=user)
        return Response(UserProfile_Interests_Serializer(interests, many=True).data)


class UserProfileInterestsViewSet(viewsets.ModelViewSet):
    queryset = UserProfile_Interests.objects.all()
    serializer_class = UserProfile_Interests_Serializer


class User_Type_ViewSet(viewsets.ModelViewSet):
    queryset = User_Type.objects.all()
    serializer_class = User_Type_Serializer


class UserLoginCountViewSet(viewsets.ModelViewSet):
    queryset = UserLogginCount.objects.all()
    serializer_class = UserLoginCountSerializer
