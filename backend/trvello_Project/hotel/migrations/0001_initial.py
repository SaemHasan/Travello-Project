# Generated by Django 3.2.14 on 2022-08-26 20:02

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('spot', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Hotel',
            fields=[
                ('hotel_id', models.BigAutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=100)),
                ('short_description', models.CharField(max_length=1000, null=True)),
                ('address_line', models.CharField(max_length=100, null=True)),
                ('thana', models.CharField(max_length=50, null=True)),
                ('upzila', models.CharField(max_length=50, null=True)),
                ('district', models.CharField(max_length=50, null=True)),
                ('cordinate_lattitude', models.DecimalField(decimal_places=8, max_digits=10, null=True)),
                ('cordinate_longitude', models.DecimalField(decimal_places=8, max_digits=10, null=True)),
                ('rating', models.FloatField(default=0)),
                ('phone_number', models.CharField(blank=True, max_length=15, null=True)),
                ('email', models.EmailField(blank=True, max_length=50, null=True)),
                ('website', models.URLField(blank=True, max_length=100, null=True)),
                ('image', models.ImageField(blank=True, null=True, upload_to='./hotel/images')),
                ('spot_id', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='spot.spot')),
            ],
        ),
        migrations.CreateModel(
            name='Hotel_Attribute',
            fields=[
                ('attribute_id', models.BigAutoField(primary_key=True, serialize=False)),
                ('attribute_name', models.CharField(max_length=100)),
                ('attribute_value', models.CharField(max_length=100, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Room',
            fields=[
                ('room_id', models.BigAutoField(primary_key=True, serialize=False)),
                ('room_no', models.IntegerField(default=0)),
                ('room_type', models.CharField(max_length=100, null=True)),
                ('image', models.ImageField(blank=True, null=True, upload_to='./hotel/images')),
                ('hotel_id', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='hotel.hotel')),
            ],
        ),
        migrations.CreateModel(
            name='Room_Attribute',
            fields=[
                ('attribute_id', models.BigAutoField(primary_key=True, serialize=False)),
                ('attribute_name', models.CharField(max_length=100)),
                ('attribute_value', models.CharField(max_length=100, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='RoomPriceInfo',
            fields=[
                ('price_id', models.BigAutoField(primary_key=True, serialize=False)),
                ('price', models.FloatField(default=1)),
                ('start_time', models.DateTimeField(null=True)),
                ('end_time', models.DateTimeField(null=True)),
                ('room_id', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='hotel.room')),
            ],
        ),
        migrations.CreateModel(
            name='Room_Attribute_Table',
            fields=[
                ('room_attribute_id', models.BigAutoField(primary_key=True, serialize=False)),
                ('value', models.CharField(max_length=100, null=True)),
                ('attribute_id', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='hotel.room_attribute')),
                ('room_id', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='hotel.room')),
            ],
        ),
        migrations.CreateModel(
            name='MISC_Detail',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=100, null=True)),
                ('distance', models.FloatField(default=1)),
                ('hotel_id', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='hotel.hotel')),
            ],
        ),
        migrations.CreateModel(
            name='HotelRatingInfo',
            fields=[
                ('rating_id', models.BigAutoField(primary_key=True, serialize=False)),
                ('factor', models.FloatField(default=1)),
                ('start_time', models.DateTimeField(null=True)),
                ('end_time', models.DateTimeField(null=True)),
                ('hotel_id', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='hotel.hotel')),
            ],
        ),
        migrations.CreateModel(
            name='Hotel_Attribute_Table',
            fields=[
                ('hotel_attribute_id', models.BigAutoField(primary_key=True, serialize=False)),
                ('value', models.CharField(max_length=100, null=True)),
                ('attribute_id', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='hotel.hotel_attribute')),
                ('hotel_id', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='hotel.hotel')),
            ],
        ),
    ]
