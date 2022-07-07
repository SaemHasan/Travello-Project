from django.contrib import admin
from .models import Activity, Agency, Activity_Agency, ActivityPriceInfo, ActivityRatingInfo
# Register your models here.

admin.site.register(Activity)
admin.site.register(Agency)
admin.site.register(Activity_Agency)
admin.site.register(ActivityPriceInfo)
admin.site.register(ActivityRatingInfo)
