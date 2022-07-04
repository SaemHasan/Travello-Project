from rest_framework import serializers
from .models import Article, Demo

class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ['id', 'title', 'description']

class DemoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Demo
        fields = ['id', 'name', 'title', 'description']