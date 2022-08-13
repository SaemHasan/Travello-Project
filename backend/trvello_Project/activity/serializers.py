from rest_framework import serializers
from .models import Activity, Agency, ActivityType_Table, Activity_Agency, ActivityPriceInfo, ActivityRatingInfo, \
    Review_Activity


class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = '__all__'

class AgencySerializer(serializers.ModelSerializer):
    class Meta:
        model = Agency
        fields = '__all__'

class ActivityType_TableSerializer(serializers.ModelSerializer):
    class Meta:
        model = ActivityType_Table
        fields = '__all__'

class Activity_AgencySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity_Agency
        fields = '__all__'

class ActivityPriceInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ActivityPriceInfo
        fields = '__all__'

class ActivityRatingInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ActivityRatingInfo
        fields = '__all__'

class ReviewActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Review_Activity
        fields = '__all__'