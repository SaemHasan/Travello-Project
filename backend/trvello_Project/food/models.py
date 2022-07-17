from django.db import models


# Create your models here.
class Food(models.Model):
    food_id = models.AutoField(primary_key=True)
    food_name = models.CharField(max_length=100)
    short_description = models.CharField(max_length=500, null=True)
    image = models.ImageField(upload_to='./food/images', null=True, blank=True)

    def __str__(self):
        return self.food_name


class FoodType_Table(models.Model):
    type_id = models.BigAutoField(primary_key=True)
    type_name = models.CharField(max_length=100)

    # category = models.CharField(max_length=100)

    def __str__(self):
        return self.type_id


class Food_Type(models.Model):
    food_type_id = models.AutoField(primary_key=True)
    food_id = models.ForeignKey(Food, on_delete=models.CASCADE)
    type_id = models.ForeignKey(FoodType_Table, on_delete=models.CASCADE)

    def __str__(self):
        return self.food_id.food_name + " " + self.type_id.type_name


class Restaurant(models.Model):
    restaurant_id = models.AutoField(primary_key=True)
    restaurant_name = models.CharField(max_length=100)
    address_line = models.CharField(max_length=100, null=True)
    thana = models.CharField(max_length=50, null=True)
    upzila = models.CharField(max_length=50, null=True)
    district = models.CharField(max_length=50, null=True)
    cordinate_lattitude = models.DecimalField(max_digits=10, decimal_places=8, null=True)
    cordinate_longitude = models.DecimalField(max_digits=10, decimal_places=8, null=True)
    phone_number = models.CharField(max_length=15, null=True)
    email = models.CharField(max_length=50, null=True)
    website = models.CharField(max_length=50, null=True)
    image = models.ImageField(upload_to='./food/images', null=True, blank=True)

    def __str__(self):
        return self.restaurant_name


class Food_Restaurant(models.Model):
    food_restaurant_id = models.AutoField(primary_key=True)
    food_id = models.ForeignKey(Food, on_delete=models.CASCADE)
    restaurant_id = models.ForeignKey(Restaurant, on_delete=models.CASCADE)

    rating = models.IntegerField(null=True, default=0)

    def __str__(self):
        return self.food_id.food_name + " " + self.restaurant_id.restaurant_name


class FoodPriceInfo(models.Model):
    price_id = models.AutoField(primary_key=True)
    food_restaurant_id = models.ForeignKey(Food_Restaurant, on_delete=models.CASCADE)
    price = models.IntegerField(null=True, default=0)
    start_date = models.DateField(null=True)
    end_date = models.DateField(null=True)

    def __str__(self):
        return self.food_restaurant_id.food_id.food_name + " " + self.food_restaurant_id.restaurant_id.restaurant_name


class FoodRatingInfo(models.Model):
    rating_id = models.AutoField(primary_key=True)
    food_restaurant_id = models.ForeignKey(Food_Restaurant, on_delete=models.CASCADE)
    factor = models.FloatField(null=True, default=0)
    start_date = models.DateField(null=True)
    end_date = models.DateField(null=True)

    def __str__(self):
        return self.food_restaurant_id.food_id.food_name + " " + self.food_restaurant_id.restaurant_id.restaurant_name
