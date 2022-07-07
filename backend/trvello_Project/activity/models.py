from django.db import models

# Create your models here.

class Activity(models.Model):
    activity_id = models.AutoField(primary_key=True)
    activity_name = models.CharField(max_length=100)
    type = models.CharField(max_length=100, null=True)
    description = models.CharField(max_length=100, null=True)

    type_id = models.ForeignKey('spot.Type', on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.activity_name

class Agency(models.Model):
    agency_id = models.AutoField(primary_key=True)
    agency_name = models.CharField(max_length=100)
    address_line = models.CharField(max_length=100, null=True)
    thana = models.CharField(max_length=50, null=True)
    district = models.CharField(max_length=50, null=True)
    cordinate_lattitude = models.DecimalField(max_digits=10, decimal_places=8, null=True)
    cordinate_longitude = models.DecimalField(max_digits=10, decimal_places=8, null=True)
    rating = models.IntegerField(default=0)
    phone_number = models.CharField(max_length=15, null=True, blank=True)
    email = models.EmailField(max_length=50, null=True, blank=True)
    website = models.URLField(max_length=100, null=True, blank=True)

    def __str__(self):
        return self.agency_name

class Activity_Agency(models.Model):
    activity_agency_id = models.AutoField(primary_key=True)
    activity_id = models.ForeignKey(Activity, on_delete=models.CASCADE, default=None)
    agency_id = models.ForeignKey(Agency, on_delete=models.CASCADE, default=None)
    rating = models.IntegerField(default=0)

    def __str__(self):
        return self.activity_agency_id

class ActivityPriceInfo(models.Model):
    price_id = models.AutoField(primary_key=True)
    price = models.IntegerField(default=0)
    start_time = models.DateTimeField(null=True)
    end_time = models.DateTimeField(null=True)
    activity_agency_id = models.ForeignKey(Activity_Agency, on_delete=models.CASCADE, default=None)

    def __str__(self):
        return self.price_id

class ActivityRatingInfo(models.Model):
    rating_id = models.AutoField(primary_key=True)
    factor = models.FloatField(default=1)
    start_time = models.DateTimeField(null=True)
    activity_agency_id = models.ForeignKey(Activity_Agency, on_delete=models.CASCADE, default=None)

    def __str__(self):
        return self.rating_id



