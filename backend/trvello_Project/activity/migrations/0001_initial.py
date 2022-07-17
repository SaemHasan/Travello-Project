# Generated by Django 4.0.2 on 2022-07-17 13:19

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Activity',
            fields=[
                ('activity_id', models.AutoField(primary_key=True, serialize=False)),
                ('activity_name', models.CharField(max_length=100)),
                ('type', models.CharField(max_length=100, null=True)),
                ('description', models.CharField(max_length=100, null=True)),
                ('image', models.ImageField(blank=True, null=True, upload_to='./activity/images')),
            ],
        ),
        migrations.CreateModel(
            name='Activity_Agency',
            fields=[
                ('activity_agency_id', models.AutoField(primary_key=True, serialize=False)),
                ('rating', models.IntegerField(default=0)),
                ('activity_id', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='activity.activity')),
            ],
        ),
        migrations.CreateModel(
            name='ActivityType_Table',
            fields=[
                ('type_id', models.BigAutoField(primary_key=True, serialize=False)),
                ('type_name', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Agency',
            fields=[
                ('agency_id', models.AutoField(primary_key=True, serialize=False)),
                ('agency_name', models.CharField(max_length=100)),
                ('address_line', models.CharField(max_length=100, null=True)),
                ('thana', models.CharField(max_length=50, null=True)),
                ('district', models.CharField(max_length=50, null=True)),
                ('cordinate_lattitude', models.DecimalField(decimal_places=8, max_digits=10, null=True)),
                ('cordinate_longitude', models.DecimalField(decimal_places=8, max_digits=10, null=True)),
                ('rating', models.IntegerField(default=0)),
                ('phone_number', models.CharField(blank=True, max_length=15, null=True)),
                ('email', models.EmailField(blank=True, max_length=50, null=True)),
                ('website', models.URLField(blank=True, max_length=100, null=True)),
                ('image', models.ImageField(blank=True, null=True, upload_to='./activity/images')),
            ],
        ),
        migrations.CreateModel(
            name='ActivityRatingInfo',
            fields=[
                ('rating_id', models.AutoField(primary_key=True, serialize=False)),
                ('factor', models.FloatField(default=1)),
                ('start_time', models.DateTimeField(null=True)),
                ('end_time', models.DateTimeField(null=True)),
                ('activity_agency_id', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='activity.activity_agency')),
            ],
        ),
        migrations.CreateModel(
            name='ActivityPriceInfo',
            fields=[
                ('price_id', models.AutoField(primary_key=True, serialize=False)),
                ('price', models.IntegerField(default=0)),
                ('start_time', models.DateTimeField(null=True)),
                ('end_time', models.DateTimeField(null=True)),
                ('activity_agency_id', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='activity.activity_agency')),
            ],
        ),
        migrations.AddField(
            model_name='activity_agency',
            name='agency_id',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='activity.agency'),
        ),
        migrations.AddField(
            model_name='activity',
            name='type_id',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='activity.activitytype_table'),
        ),
    ]