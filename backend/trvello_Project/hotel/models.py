from django.db import models

# Create your models here.

class Hotel(models.Model):
    hotel_id = models.BigAutoField(primary_key=True)
    #spot id add baki
    name = models.CharField(max_length=100)
    short_description = models.CharField(max_length=1000)
    address_line = models.CharField(max_length=100)
    thana = models.CharField(max_length=50)
    upzila = models.CharField(max_length=50)
    district = models.CharField(max_length=50)
    cordinate_lattitude = models.DecimalField(max_digits=10, decimal_places=8)
    cordinate_longitude = models.DecimalField(max_digits=10, decimal_places=8)
    phone_number = models.CharField(max_length=15)
    email = models.EmailField(max_length=50)
    website = models.URLField(max_length=100)
    def __str__(self):
        return self.hotel_id
