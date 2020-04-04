from rest_framework import serializers
from .models import User,UserProfile,Travel,TravelImage,ViewedTravelLog
from django.contrib.auth import get_user_model
from django.contrib.auth.models import update_last_login
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # ...

        return token


    
class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserProfile
        fields = ('first_name', 'last_name', 'phone_number', 'age', 'gender')


class UserRegistrationSerializer(serializers.ModelSerializer):

    # profile = UserSerializer(required=False)
    email = serializers.EmailField(
            required=True,
            validators=[UniqueValidator(queryset=User.objects.all())]
            )
    username = serializers.CharField(
            validators=[UniqueValidator(queryset=User.objects.all())]
            )
    password = serializers.CharField(min_length=6)
    class Meta:
        model = User
        fields = ('username','email', 'password' )
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        # profile_data = validated_data.pop('profile')
        user = User.objects.create_user(validated_data['username'], 
                                        validated_data['email'],
                                        validated_data['password'])
    #     UserProfile.objects.create( 
    #         user=user,
    #         first_name=profile_data['first_name'],
    #         last_name=profile_data['last_name'],
    #         phone_number=profile_data['phone_number'],
    #         age=profile_data['age'],
    #         gender=profile_data['gender']
    #     )
        return user

def authenticateByUName(username=None, password=None):    
        try:
            user = get_user_model().objects.get(username=username)
            if user.check_password(password):
                return user
        except User.DoesNotExist:
            return None
def authenticateByEmail(email=None, password=None):      
        try:
            user = get_user_model().objects.get(email=email)
            if user.check_password(password):
                return user
        except User.DoesNotExist:
            return None
  

class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=255,required=False)
    email = serializers.CharField(max_length=255,required=False)
    password = serializers.CharField(max_length=128, write_only=True)
    access_token = serializers.CharField(max_length=255, read_only=True)
    refresh_token = serializers.CharField(max_length=255, read_only=True)
    
    def validate(self, data):
        username = data.get("username", None)
        email = data.get("email", None)
        password = data.get("password", None)       
        user=authenticateByEmail(email=email, password=password);
        if  user == None :
            user=authenticateByUName(username=username, password=password);
            if user == None :
                raise serializers.ValidationError('A user with given email or username and password is not found.')
            else:                      
                jwt_token = MyTokenObtainPairSerializer.get_token(user)
                update_last_login(None, user)
                return {
            'username':user.username,
            'email':user.email,
            'access_token': jwt_token.access_token,
            'refresh_token': jwt_token
        }
               
        else:           
            jwt_token = MyTokenObtainPairSerializer.get_token(user)
            update_last_login(None, user)
            return {
            'username':user.username,
            'email':user.email,
            'access_token': jwt_token.access_token,
            'refresh_token': jwt_token}
            
        

class TravelImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = TravelImage
        fields = '__all__'
        
class TravelSerializer(serializers.ModelSerializer):
    image=TravelImageSerializer(many=True,required=False)

    def __init__(self, *args, **kwargs):
        self.user = kwargs.pop('user')
        super().__init__(*args, **kwargs)

    def validate(self, data):
        user = self.user
        data['user'] = user
        return data

    class Meta:
        model= Travel
        fields=('id','name', 'description', 'location','date_added', 'note','image','user_id')
    
class ViewedTravelLogSerializer(serializers.ModelSerializer):
    MESSAGE_TYPE = 'viewedTravel'
    VERSION = 1
    KEY_FIELD = 'uuid'

    class Meta:
        model = ViewedTravelLog
        fields= ['uuid','viewer_username','viewer_email','viewed_email','viewed_username','viewed_travel_id','viewed_travel_name' ,'viewed_date']
    @classmethod
    def lookup_instance(cls,uuid,**kwargs):
        try:
            return ViewedTravelLog.objects.get(uuid=uuid)
        except ViewedTravelLog.DoesNotExist:
            pass
        