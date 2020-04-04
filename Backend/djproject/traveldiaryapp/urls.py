from django.conf.urls import url,include
from django.urls import  path
from . import views
# from django.conf import settings
from rest_framework import routers
from . import views
router=routers.DefaultRouter()

urlpatterns = [
    url(r'', include(router.urls)),
    url(r'^signup', views.UserRegistrationView.as_view()),
    url(r'^signin', views.UserLoginView.as_view()),
    url(r'^profile', views.UserProfileView.as_view()),
    path('travels/',views.TravelListViewSet.as_view()),
    path('travel/<int:pk>',views.TravelViewSet.as_view()),
    path('usertravels/',views.UserTravelViewSet.as_view()),
    path('usertravels/<int:pk>',views.EditUserTravelViewSet.as_view()),
    path('photos/<int:travelid>',views.TravelImagesView.as_view()),
    path('addphoto/<int:travelid>',views.AddImageView.as_view()),
    path('editphoto/<int:travelid>/<int:pk>',views.EditImageView.as_view())
    ]