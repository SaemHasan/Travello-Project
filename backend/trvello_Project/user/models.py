from django.db import models

# Create your models here.

from django.contrib.auth.models import User

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    date_of_birth = models.DateField(null=True)
    address_line = models.CharField(max_length=100, null=True)
    thana = models.CharField(max_length=50, null=True)
    upzila = models.CharField(max_length=50, null=True)
    district = models.CharField(max_length=50, null=True)
    cordinate_lattitude = models.DecimalField(max_digits=10, decimal_places=8, null=True)
    cordinate_longitude = models.DecimalField(max_digits=10, decimal_places=8, null=True)
    phone_number = models.CharField(max_length=15, null=True)
    email = models.CharField(max_length=50, null=True)

    def __str__(self):
        return self.user.username

class UserProfile_Interests(models.Model):
    interest_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    interest = models.CharField(max_length=100, null=True)

    class Meta:
        unique_together = (("user", "interest"),)

    def __str__(self):
        return self.user.username

class User_Type(models.Model):
    user_type_id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    type_id = models.ForeignKey('spot.Type', on_delete=models.CASCADE)

    def __str__(self):
        return self.user_id.user.username + " " + self.type_id.type_name



