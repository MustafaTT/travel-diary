from rest_framework import status
from rest_framework.generics import CreateAPIView ,RetrieveAPIView
from rest_framework.permissions import AllowAny,IsAuthenticated
from .serializers import UserRegistrationSerializer,UserLoginSerializer,TravelSerializer,TravelImageSerializer,ViewedTravelLogSerializer
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import UserProfile,Travel,User,TravelImage,ViewedTravelLog
from rest_framework.parsers import JSONParser
from django.http import JsonResponse
from rest_framework.views import APIView
from django.core.files.storage import default_storage
from django.db.models import Prefetch
from logpipe import Producer
from datetime import datetime


class UserRegistrationView(CreateAPIView):
    serializer_class = UserRegistrationSerializer
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        status_code = status.HTTP_201_CREATED
        response = {
            'success' : 'True',
            'status code' : status_code,
            'message': 'User registered  successfull',
            }       
        return JsonResponse(response, status=status_code)


class UserLoginView(RetrieveAPIView):
    
    serializer_class = UserLoginSerializer

    def post(self, request):
        try:
            serializer = self.serializer_class(data=request.data)
            serializer.is_valid(raise_exception=True)
            response = {
            'success' : 'True',
            'status code' : status.HTTP_200_OK,
            'message': 'User logged in  successfully',
            'access_token' : serializer.data['access_token'],
            'refresh_token' : serializer.data['refresh_token']
            }
            status_code = status.HTTP_200_OK

            return JsonResponse(response, status=status_code)
        except Exception as e:
            status_code = status.HTTP_400_BAD_REQUEST
            response = {
                'success': 'false',
                'status code': status.HTTP_400_BAD_REQUEST,
                'message': 'User does not exists',
                'error': str(e)
                }
        return JsonResponse(response, status=status_code)
class UserProfileView(RetrieveAPIView):
    
    permission_classes = (IsAuthenticated,)
    def get(self, request):
        try:
            user_profile = UserProfile.objects.get(user=request.user)
            status_code = status.HTTP_200_OK
            response = {
                'success': 'true',
                'status code': status_code,
                'message': 'User profile fetched successfully',
                'data': [{
                    'first_name': user_profile.first_name,
                    'last_name': user_profile.last_name,
                    'phone_number': user_profile.phone_number,
                    'age': user_profile.age,
                    'gender': user_profile.gender,
                    }]
                }

        except Exception as e:
            status_code = status.HTTP_400_BAD_REQUEST
            response = {
                'success': 'false',
                'status code': status.HTTP_400_BAD_REQUEST,
                'message': 'User does not exists',
                'error': str(e)
                }
        return JsonResponse(response, status=status_code)

class TravelListViewSet(APIView):
        permission_classes = (IsAuthenticated,)
    #Get all
        def get(self,request):
                
                travels = Travel.objects.prefetch_related(Prefetch('image', queryset=TravelImage.objects.filter(is_main=True)))
                
                travels_serializer = TravelSerializer(travels,many=True,user=request.user)
                return JsonResponse(travels_serializer.data,safe=False)
                
    
class TravelViewSet(APIView):
        permission_classes = (IsAuthenticated,)
    #Get travel
        def get(self,request,pk):
                
            travel = Travel.objects.filter(pk=pk).prefetch_related('image')[0]
# send log to broker as topicname viwedTravel if another user view user travel
            if (travel.user.username != request.user.username) :
                viewed_log = ViewedTravelLog(
                                    viewer_username=request.user.username,
                                    viewer_email=request.user.email,
                                    viewed_username=travel.user.username,
                                    viewed_email=travel.user.email,
                                    viewed_travel_id=travel.id,
                                    viewed_travel_name=travel.name,
                                    viewed_date=datetime.now())
                producer=Producer('viewedTravel',ViewedTravelLogSerializer)
                producer.send(viewed_log)

            travel_serializer = TravelSerializer(travel,many=False,user=request.user)
            return JsonResponse(travel_serializer.data,safe=False)    


class EditUserTravelViewSet(APIView):
        permission_classes = (IsAuthenticated,)
        def get(self,request,pk):
                
            try:
                travel = Travel.objects.get(pk=pk,user=request.user)
                travel_serializer = TravelSerializer(travel,user=request.user)
                return JsonResponse(travel_serializer.data)
            except Travel.DoesNotExist:
                return JsonResponse(status=status.HTTP_404_NOT_FOUND)
       
    #Update travel
        def put(self,request,pk):
                try:
                    
                    if  Travel.objects.filter(user=request.user,pk=pk).count()>0:
                        travel_data =JSONParser().parse(request)
                        travel = Travel.objects.get(user=request.user,pk=pk)
                        travel.name=travel_data['name']
                        travel.description=travel_data['description']
                        travel.location=travel_data['location']
                        travel.note=travel_data['note']
                        travel.save()
                        travel_serializer = TravelSerializer(travel,user=request.user)
                        return JsonResponse(travel_serializer.data,status=status.HTTP_204_NO_CONTENT)
                    return JsonResponse(travel_serializer.errors,status=status.HTTP_400_BAD_REQUEST)
                except Travel.DoesNotExist:
                    return JsonResponse(status=status.HTTP_404_NOT_FOUND)
                
    #Delete travel
        def delete(self,request,pk):
            try:
                travel = Travel.objects.get(user=request.user,pk=pk)
                travel.delete()
                return JsonResponse({'massage': 'Succesfully Deleted', 'status':status.HTTP_404_NOT_FOUND})
            except Travel.DoesNotExist:
                return JsonResponse(status=status.HTTP_404_NOT_FOUND)
            
class UserTravelViewSet(APIView):
        permission_classes = (IsAuthenticated,)
        def get(self,request):
                
            try:
                travels = Travel.objects.filter(user=request.user)
                travels_serializer = TravelSerializer(travels,user=request.user,many=True)
                return JsonResponse(travels_serializer.data,safe=False)
            except Travel.DoesNotExist:
                return JsonResponse(status=status.HTTP_404_NOT_FOUND)
        def post(self,request):
                travel_data =JSONParser().parse(request)
                travel_serializer=TravelSerializer(data=travel_data,user=request.user)
                if  travel_serializer.is_valid():
                    travel_serializer.save()
                    return JsonResponse(travel_serializer.data ,status=status.HTTP_201_CREATED)
                return JsonResponse(travel_serializer.errors ,status=status.HTTP_400_BAD_REQUEST)

class TravelImagesView(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self,request,travelid):
                
            try:
                travel = Travel.objects.get(pk=travelid)
                travel_image = TravelImage.objects.filter(travel_id=travel.id)
                travel_image_serializer = TravelImageSerializer(travel_image,many=True)
                return JsonResponse(travel_image_serializer.data,safe=False)
            except Travel.DoesNotExist:
                return JsonResponse(status=status.HTTP_404_NOT_FOUND)
                
class AddImageView(APIView):
    permission_classes = (IsAuthenticated,)
    def post(self,request,travelid):
        
        travel = Travel.objects.get(user=request.user,pk=travelid)
        file = request.FILES['file']
        save_path = 'images/user_{0}/{1}/{2}'.format(request.user.id,travel.id,file.name)
        
        path = default_storage.save(save_path, file)

        if TravelImage.objects.filter(is_main=True,travel=travel).count() < 1 :
            image = TravelImage.objects.create(image=path ,travel=travel,is_main=True)
        else:
            image = TravelImage.objects.create(image=path ,travel=travel,is_main=False)
        return JsonResponse({'document': image.id,'path':path,'is_main':image.is_main, 'status':status.HTTP_201_CREATED})

class EditImageView(APIView):

    permission_classes = (IsAuthenticated,)
    def delete(self,request,travelid,pk):  
        try:    
            travel = Travel.objects.get(user=request.user,pk=travelid)
            image = TravelImage.objects.get(pk=pk,travel=travel)
            image.delete()
            return JsonResponse({'massage': 'Succesfully Deleted', 'status':status.HTTP_404_NOT_FOUND})  
        except TravelImage.DoesNotExist:
            return JsonResponse({'massage': 'Image could not found', 'status':status.HTTP_404_NOT_FOUND})

    def put(self,request,travelid,pk):
       
            travel = Travel.objects.get(user=request.user,pk=travelid)
            TravelImage.objects.filter(is_main=True,travel=travel).update(is_main=False)
            
            image = TravelImage.objects.get(pk=pk,travel=travel)
            image.is_main=True
            image.save(update_fields=["is_main"])
            return JsonResponse({'massage': 'Image succesfully assign as main.', 'status':status.HTTP_200_OK})
        