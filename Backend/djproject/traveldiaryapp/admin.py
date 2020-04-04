

# Register your models here.

from django.contrib import admin
from .models import User,TravelImage,UserProfile,Travel
class UserAdmin(admin.ModelAdmin):
    model = User

admin.site.register(User,UserAdmin)
admin.site.register(UserProfile)
admin.site.register(TravelImage)
admin.site.register(Travel)