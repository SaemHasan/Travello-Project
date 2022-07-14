from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserProfile_Interests, User_Type
from rest_framework.authtoken.views import Token


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'email', 'first_name', 'last_name']

        extra_kwargs = {
            'password': {
                'write_only': True,
                'required': True
            }
        }

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        Token.objects.create(user=user)
        return user

class UserProfile_Interests_Serializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile_Interests
        fields = ['interest_id', 'user', 'interest']

    def create(self, validated_data):
        print(validated_data)
        user = User.objects.get(id=validated_data['user'].id)
        user_interest = UserProfile_Interests()
        user_interest.user = user
        user_interest.interest = validated_data['interest']
        user_interest.save()
        return user_interest
