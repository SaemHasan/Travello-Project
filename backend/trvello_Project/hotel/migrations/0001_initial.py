# Generated by Django 4.0.6 on 2022-07-07 19:37

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Hotel',
            fields=[
                ('hotel_id', models.BigAutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=100)),
                ('short_description', models.CharField(max_length=1000)),
                ('address_line', models.CharField(max_length=100)),
                ('thana', models.CharField(max_length=50)),
                ('upzila', models.CharField(max_length=50)),
                ('district', models.CharField(max_length=50)),
                ('cordinate_lattitude', models.DecimalField(decimal_places=8, max_digits=10)),
                ('cordinate_longitude', models.DecimalField(decimal_places=8, max_digits=10)),
                ('phone_number', models.CharField(max_length=15)),
                ('email', models.EmailField(max_length=50)),
                ('website', models.URLField(max_length=100)),
            ],
        ),
    ]
