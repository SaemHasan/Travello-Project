
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, UserProfileInterestsViewSet, User_Type_ViewSet

router = DefaultRouter()
router.register('users', UserViewSet, basename='users')
router.register('userinterests', UserProfileInterestsViewSet, basename='userinterests')
router.register('usertypes', User_Type_ViewSet, basename='usertypes')

urlpatterns = [
    path('api/', include(router.urls)),

]