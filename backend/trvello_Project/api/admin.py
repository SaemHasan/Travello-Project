from django.contrib import admin
from .models import Article,Demo
# Register your models here.

# admin.site.register(Article)

@admin.register(Article)
class ArticleModel(admin.ModelAdmin):
    list_filter = ('title', 'description')
    list_display = ('title', 'description')


@admin.register(Demo)
class DemoModel(admin.ModelAdmin):
    list_filter = ('name','title', 'description')
    list_display = ('name','title', 'description')