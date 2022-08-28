from datetime import datetime, timedelta, date

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

    @action(detail=False, methods=['post', 'get', 'put'])
    def updateUserLoginCount(self, request):
        token = request.data['token']
        user = User.objects.get(auth_token=token)
        if user.username == 'admin':
            return Response({"message": "You are not allowed to update this user"})

        if UserLogginCount.objects.filter(user=user, date=date.today()).exists():
            user_login_count = UserLogginCount.objects.get(user=user, date=date.today())
            user_login_count.count += 1
            user_login_count.save()
        else:
            user_login_count = UserLogginCount.objects.create(user=user, count=1, date=date.today())
            user_login_count.save()

        return Response(UserLoginCountSerializer(user_login_count).data)

    @action(detail=False, methods=['post', 'get', 'put'])
    def getUserLoginCountOfLastWeek(self, request):
        user_login_count = UserLogginCount.objects.filter(date__gt=datetime.now() - timedelta(days=7))
        date_wise_count = {}
        for count in user_login_count:
            date = str(count.date)
            if date in date_wise_count:
                date_wise_count[date] += count.count
            else:
                date_wise_count[date] = count.count

        date_count_list = []
        for date, count in date_wise_count.items():
            date_count_list.append({"date": date, "count": count})
        print("date count \n", date_count_list)
        return Response(date_count_list)

    @action(detail=False, methods=['post', 'get', 'put'])
    def getMostLogInUsersofWeek(self, request):
        user_login_count = UserLogginCount.objects.filter(date__gt=date.today() - timedelta(days=7))

        user_login_countOfWeek = {}
        for count in user_login_count:
            user = count.user.username
            if user in user_login_countOfWeek:
                user_login_countOfWeek[user] += count.count
            else:
                user_login_countOfWeek[user] = count.count

        sorted_user_login_countOfWeek = sorted(user_login_countOfWeek.items(), key=lambda x: x[1], reverse=True)[:5]
        print("sorted user login count of week \n", sorted_user_login_countOfWeek)
        user_login_countOfWeek_list = []
        for user, count in sorted_user_login_countOfWeek:
            user_login_countOfWeek_list.append({"user": user, "count": count})
        print("user count \n", user_login_countOfWeek_list)

        return Response(user_login_countOfWeek_list)
