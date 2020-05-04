from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import *


class UserView(UserAdmin):
	list_display = ('name', 'email', 'phone_number')
	search_fields = ('email', 'phone_number')

	filter_horizontal = ()
	list_filter = ()
	fieldsets = ()

admin.site.register(User, UserView)