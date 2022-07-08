# Generated by Django 4.0.6 on 2022-07-07 21:24

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('spot', '0004_type'),
    ]

    operations = [
        migrations.CreateModel(
            name='Food',
            fields=[
                ('food_id', models.AutoField(primary_key=True, serialize=False)),
                ('food_name', models.CharField(max_length=100)),
                ('short_description', models.CharField(max_length=500, null=True)),
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
            ],
        ),
        migrations.CreateModel(
            name='Food_Type',
            fields=[
                ('food_type_id', models.AutoField(primary_key=True, serialize=False)),
                ('food_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='food.food')),
                ('type_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='spot.type')),
            ],
        ),
    ]