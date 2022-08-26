# Generated by Django 3.2.14 on 2022-08-26 20:02

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Food',
            fields=[
                ('food_id', models.AutoField(primary_key=True, serialize=False)),
                ('food_name', models.CharField(max_length=100)),
                ('short_description', models.CharField(max_length=500, null=True)),
                ('image', models.ImageField(blank=True, null=True, upload_to='./food/images')),
            ],
        ),
        migrations.CreateModel(
            name='Food_Restaurant',
            fields=[
                ('food_restaurant_id', models.AutoField(primary_key=True, serialize=False)),
                ('rating', models.FloatField(default=0, null=True)),
                ('food_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='food.food')),
            ],
        ),
        migrations.CreateModel(
            name='FoodType_Table',
            fields=[
                ('type_id', models.BigAutoField(primary_key=True, serialize=False)),
                ('type_name', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Restaurant',
            fields=[
                ('restaurant_id', models.AutoField(primary_key=True, serialize=False)),
                ('restaurant_name', models.CharField(max_length=100)),
                ('address_line', models.CharField(max_length=100, null=True)),
                ('thana', models.CharField(max_length=50, null=True)),
                ('upzila', models.CharField(max_length=50, null=True)),
                ('district', models.CharField(max_length=50, null=True)),
                ('cordinate_lattitude', models.DecimalField(decimal_places=8, max_digits=10, null=True)),
                ('cordinate_longitude', models.DecimalField(decimal_places=8, max_digits=10, null=True)),
                ('phone_number', models.CharField(max_length=15, null=True)),
                ('email', models.CharField(max_length=50, null=True)),
                ('website', models.CharField(max_length=50, null=True)),
                ('image', models.ImageField(blank=True, null=True, upload_to='./food/images')),
            ],
        ),
        migrations.CreateModel(
            name='Review_Food',
            fields=[
                ('review_id', models.AutoField(primary_key=True, serialize=False)),
                ('desc', models.CharField(max_length=1000, null=True)),
                ('user', models.CharField(max_length=100, null=True)),
                ('food', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='food.food')),
            ],
        ),
        migrations.CreateModel(
            name='FoodRatingInfo',
            fields=[
                ('rating_id', models.AutoField(primary_key=True, serialize=False)),
                ('factor', models.FloatField(default=0, null=True)),
                ('start_date', models.DateTimeField(null=True)),
                ('end_date', models.DateTimeField(null=True)),
                ('food_restaurant_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='food.food_restaurant')),
            ],
        ),
        migrations.CreateModel(
            name='FoodPriceInfo',
            fields=[
                ('price_id', models.AutoField(primary_key=True, serialize=False)),
                ('price', models.IntegerField(default=0, null=True)),
                ('start_date', models.DateTimeField(null=True)),
                ('end_date', models.DateTimeField(null=True)),
                ('food_restaurant_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='food.food_restaurant')),
            ],
        ),
        migrations.CreateModel(
            name='Food_Type',
            fields=[
                ('food_type_id', models.AutoField(primary_key=True, serialize=False)),
                ('food_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='food.food')),
                ('type_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='food.foodtype_table')),
            ],
        ),
        migrations.AddField(
            model_name='food_restaurant',
            name='restaurant_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='food.restaurant'),
        ),
    ]
