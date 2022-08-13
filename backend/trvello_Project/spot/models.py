from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class Place(models.Model):
    place_id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=100)
    short_description = models.CharField(max_length=1000, null=True)
    district = models.CharField(max_length=50, null=True)
    cordinate_lattitude = models.DecimalField(max_digits=10, decimal_places=8, null=True)
    cordinate_longitude = models.DecimalField(max_digits=10, decimal_places=8, null=True)
    rating = models.FloatField(default=0)
    image = models.ImageField(upload_to='./spot/images', null=True, blank=True)

    def __str__(self):
        return self.name


class PlaceRatingInfo(models.Model):
    rating_id = models.BigAutoField(primary_key=True)
    factor = models.FloatField(default=1)
    start_time = models.DateTimeField(null=True)
    end_time = models.DateTimeField(null=True)
    place_id = models.ForeignKey('Place', on_delete=models.CASCADE, default=None)

    def __str__(self):
        return self.place_id.name + " " + str(self.rating_id)


class Spot(models.Model):
    spot_id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=100)
    short_description = models.CharField(max_length=1000, null=True)
    address_line = models.CharField(max_length=100, null=True)
    district = models.CharField(max_length=50, null=True)
    thana = models.CharField(max_length=50, null=True)
    upzila = models.CharField(max_length=50, null=True)
    cordinate_lattitude = models.DecimalField(max_digits=10, decimal_places=8, null=True)
    cordinate_longitude = models.DecimalField(max_digits=10, decimal_places=8, null=True)
    rating = models.FloatField(default=0)
    image = models.ImageField(upload_to='./spot/images', null=True, blank=True)

    place_id = models.ForeignKey(Place, related_name='spots', on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class SpotRatingInfo(models.Model):
    rating_id = models.BigAutoField(primary_key=True)
    factor = models.FloatField(default=1)
    start_time = models.DateTimeField(null=True)
    end_time = models.DateTimeField(null=True)
    spot_id = models.ForeignKey(Spot, on_delete=models.CASCADE, default=None)

    def __str__(self):
        return self.spot_id.name + " " + str(self.rating_id)


class SpotType_Table(models.Model):
    type_id = models.BigAutoField(primary_key=True)
    type_name = models.CharField(max_length=100)

    # category = models.CharField(max_length=100)

    def __str__(self):
        return self.type_name


class Spot_Type(models.Model):
    spot_type_id = models.BigAutoField(primary_key=True)
    spot_id = models.ForeignKey(Spot, on_delete=models.CASCADE, default=None)
    type_id = models.ForeignKey(SpotType_Table, on_delete=models.CASCADE, default=None)

    def __str__(self):
        return self.spot_id.name + " " + self.type_id.type_name


class User_Spot(models.Model):
    user_spot_id = models.BigAutoField(primary_key=True)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, default=None)
    spot_id = models.ForeignKey(Spot, on_delete=models.CASCADE, default=None)

    def __str__(self):
        return self.user_id.username + " " + self.spot_id.name


class User_Place(models.Model):
    user_place_id = models.BigAutoField(primary_key=True)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, default=None)
    place_id = models.ForeignKey(Place, on_delete=models.CASCADE, default=None)

    def __str__(self):
        return self.user_id.username + " " + self.place_id.name


class Spot_Food(models.Model):
    spot_food_id = models.BigAutoField(primary_key=True)
    spot_id = models.ForeignKey(Spot, on_delete=models.CASCADE, default=None)
    food_id = models.ForeignKey('food.Food', on_delete=models.CASCADE, default=None)

    def __str__(self):
        return self.spot_id.name + " " + self.food_id.food_name


class Spot_Activity(models.Model):
    spot_activity_id = models.BigAutoField(primary_key=True)
    spot_id = models.ForeignKey(Spot, on_delete=models.CASCADE, default=None)
    activity_id = models.ForeignKey('activity.Activity', on_delete=models.CASCADE, default=None)

    # def __str__(self):
    #     return self.spot_id.name + " " + self.activity_id.name
    def __str__(self):
        return self.spot_id.name + " " + self.activity_id.activity_name


class Review_Place(models.Model):
    review_id = models.BigAutoField(primary_key=True)
    desc = models.CharField(max_length=1000, null=True)
    place = models.ForeignKey(Place, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.review_id)


class Review_Spot(models.Model):
    review_id = models.BigAutoField(primary_key=True)
    desc = models.CharField(max_length=1000, null=True)
    spot = models.ForeignKey(Spot, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.review_id)
