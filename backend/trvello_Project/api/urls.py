

from django.urls import path, include
from .views import ArticleViewSet,DemoViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('articles', ArticleViewSet, basename='articles')
router.register('demo', DemoViewSet, basename='demo')


urlpatterns = [
    path('api/', include(router.urls)),
]