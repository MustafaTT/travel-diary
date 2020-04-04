import uuid
from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser
from django.dispatch import receiver
from django.core.validators import FileExtensionValidator
from datetime import datetime
import os

class UserManager(BaseUserManager):
    '''
    creating a manager for a custom user model
  
    '''
    def create_user(self, username , email, password=None):
        """
        Create and return a `User` with an email, username and password.
        """
        if not username:
            raise ValueError('Users Must Have an username address')
        if not email:
            raise ValueError('Users Must Have an email address')

        user = self.model(
            username=username,
            email=self.normalize_email(email),
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password):
        """
        Create and return a `User` with superuser (admin) permissions.
        """
        if password is None:
            raise TypeError('Superusers must have a password.')
        user = self.create_user(username ,email, password)
        user.is_superuser = True
        user.is_staff = True
        user.save()

        return user


class User(AbstractBaseUser):

    def has_perm(self, perm, obj=None):
        return self.is_superuser

    def has_module_perms(self, app_label):
        return self.is_superuser

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    username = models.CharField(
        verbose_name='username',
        max_length=255,
        unique=True)
    email = models.EmailField(
        verbose_name='email address',
        max_length=255,
        unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    # Tells Django that the UserManager class defined above should manage
    # objects of this type.

    objects = UserManager()

    def __str__(self):
        return self.email

    class Meta:
        '''
        to set table name in database
        '''
        db_table = "User"

class UserProfile(models.Model):
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    first_name = models.CharField(max_length=50, unique=False)
    last_name = models.CharField(max_length=50, unique=False)
    phone_number = models.CharField(max_length=10, unique=False, null=True, blank=True)
    age = models.PositiveIntegerField(null=True, blank=True)
    GENDER_CHOICES = (
        ('M', 'Male'),
        ('F', 'Female'),
    )
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES)

    class Meta:
        '''
        to set table name in database
        '''
        db_table = "Userprofile"

class Travel(models.Model):

    id=models.AutoField(primary_key=True,auto_created=True)
    name=models.CharField(max_length=50, unique=False)
    description=models.CharField(max_length=50, unique=False)
    location=models.CharField(max_length=50, unique=False)
    note=models.TextField(unique=False)
    date_added=models.DateTimeField(default=datetime.now(), blank=False)
    user=models.ForeignKey(User,to_field="username",on_delete=models.CASCADE)
    
    class Meta:
        '''
        to set table name in database
        '''
        db_table = "Travel"

def user_directory_path(instance, filename):

    # file will be uploaded to MEDIA_ROOT/user_<id>/<filename>
    
    return 'images/user_{0}/{1}/{2}'.format(instance.travel.user_id,instance.travel.id,filename)
class TravelImage(models.Model):
    
    id=models.AutoField(primary_key=True,auto_created=True)
    is_main=models.BooleanField(default=False)
    image=models.ImageField(upload_to=user_directory_path,max_length=255,validators=[FileExtensionValidator(allowed_extensions=['jpeg','jpg','bmp','png'])])
    travel=models.ForeignKey(Travel, on_delete=models.CASCADE,related_name='image')
    
    class Meta:
        unique_together = ('is_main', 'id')
        '''
        to set table name in database
        '''
        db_table = "TravelImage"

#Signal for delete photos after it has been deleted from database

@receiver(models.signals.post_delete, sender=TravelImage) 
def auto_delete_file_on_delete(sender, instance, **kwargs):
    """
    Deletes file from filesystem
    when corresponding `MediaFile` object is deleted.
    """
    if instance.image:
        if os.path.isfile(instance.image.path):
            os.remove(instance.image.path)

class ViewedTravelLog(models.Model):
    uuid=models.UUIDField(default=uuid.uuid4,unique=True)
    viewer_username = models.CharField(max_length=255)
    viewer_email = models.CharField(max_length=255)
    viewed_username = models.CharField(max_length=255)
    viewed_email = models.CharField(max_length=255)
    viewed_travel_id=models.CharField(max_length=255)
    viewed_travel_name=models.CharField(max_length=255)
    viewed_date=models.DateTimeField(default=datetime.now(), blank=False)

    class Meta:

#Option for not to create database table of model. We're already sending the info to Kafka and SpringBoot consumes it and stores at local storage.
       
        managed = False

