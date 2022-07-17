import sys
from django.db import models


# Create your models here.


class Hotel(models.Model):
    hotel_id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=100)
    short_description = models.CharField(max_length=1000, null=True)
    address_line = models.CharField(max_length=100, null=True)
    thana = models.CharField(max_length=50, null=True)
    upzila = models.CharField(max_length=50, null=True)
    district = models.CharField(max_length=50, null=True)
    cordinate_lattitude = models.DecimalField(max_digits=10, decimal_places=8, null=True)
    cordinate_longitude = models.DecimalField(max_digits=10, decimal_places=8, null=True)
    rating = models.IntegerField(default=0)
    phone_number = models.CharField(max_length=15, null=True, blank=True)
    email = models.EmailField(max_length=50, null=True, blank=True)
    website = models.URLField(max_length=100, null=True, blank=True)
    image = models.ImageField(upload_to='./hotel/images', null=True, blank=True)

    spot_id = models.ForeignKey('spot.Spot', on_delete=models.CASCADE, default=None)

    def __str__(self):
        return self.hotel_id


class Hotel_Attribute(models.Model):
    attribute_id = models.BigAutoField(primary_key=True)
    attribute_name = models.CharField(max_length=100)
    attribute_value = models.CharField(max_length=100, null=True)

    def __str__(self):
        return self.attribute_id


class Hotel_Attribute_Table(models.Model):
    hotel_attribute_id = models.BigAutoField(primary_key=True)
    hotel_id = models.ForeignKey(Hotel, on_delete=models.CASCADE, default=None)
    attribute_id = models.ForeignKey(Hotel_Attribute, on_delete=models.CASCADE, default=None)
    value = models.CharField(max_length=100, null=True)

    def __str__(self):
        return self.hotel_attribute_id


class HotelRatingInfo(models.Model):
    rating_id = models.BigAutoField(primary_key=True)
    factor = models.FloatField(default=1)
    start_time = models.DateTimeField(null=True)
    end_time = models.DateTimeField(null=True)
    hotel_id = models.ForeignKey(Hotel, on_delete=models.CASCADE, default=None)

    def __str__(self):
        return self.rating_id


class Room(models.Model):
    room_id = models.BigAutoField(primary_key=True)
    hotel_id = models.ForeignKey(Hotel, on_delete=models.CASCADE, default=None)
    room_no = models.IntegerField(default=0)
    room_type = models.CharField(max_length=100, null=True)
    image = models.ImageField(upload_to='./hotel/images', null=True, blank=True)

    def __str__(self):
        return self.room_id


class RoomPriceInfo(models.Model):
    price_id = models.BigAutoField(primary_key=True)
    factor = models.FloatField(default=1)
    start_time = models.DateTimeField(null=True)
    end_time = models.DateTimeField(null=True)
    room_id = models.ForeignKey(Room, on_delete=models.CASCADE, default=None)

    def __str__(self):
        return self.price_id


class Room_Attribute(models.Model):
    attribute_id = models.BigAutoField(primary_key=True)
    attribute_name = models.CharField(max_length=100)
    attribute_value = models.CharField(max_length=100, null=True)

    def __str__(self):
        return self.attribute_id


class Room_Attribute_Table(models.Model):
    room_attribute_id = models.BigAutoField(primary_key=True)
    room_id = models.ForeignKey(Room, on_delete=models.CASCADE, default=None)
    attribute_id = models.ForeignKey(Room_Attribute, on_delete=models.CASCADE, default=None)
    value = models.CharField(max_length=100, null=True)

    def __str__(self):
        return self.room_attribute_id

