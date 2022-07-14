
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, UserProfileInterestsViewSet

router = DefaultRouter()
router.register('users', UserViewSet, basename='users')
router.register('userinterests', UserProfileInterestsViewSet, basename='userinterests')

urlpatterns = [
    path('api/', include(router.urls)),

]