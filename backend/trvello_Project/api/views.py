from .models import Article, Demo
from .serializers import ArticleSerializer, DemoSerializer
from rest_framework import viewsets, generics, mixins


class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer

class DemoViewSet(viewsets.ModelViewSet):
    queryset = Demo.objects.all()
    serializer_class = DemoSerializer