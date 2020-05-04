from django.db import models
from django.contrib.auth.models import PermissionsMixin, AbstractBaseUser, BaseUserManager, AbstractUser

class User_manager(BaseUserManager):
    def create_user(self, name, username, email, password, phone_number):
        email = self.normalize_email(email)
        user = self.model(name=name, username=username, email=email, phone_number=phone_number)
        user.set_password(password)
        user.save(using=self.db)
        return user

    def create_superuser(self, name,username, email, password, phone_number):
        user = self.create_user(name=name, username=username,email=email, password=password, phone_number=phone_number)
        user.is_superuser = True
        user.is_staff = True
        user.save()
        return user


class User(AbstractUser):
    name = models.CharField(max_length=32, unique=False, null=False, default='name')
    username = models.CharField(max_length=32, unique=True, null=False, default='username')
    email = models.EmailField(max_length=32, unique=True, null=False, default='email')
    phone_number = models.CharField(max_length=10,unique= True, null=False, default='9999999999')

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    REQUIRED_FIELDS = ["name", "phone_number",'username']
    USERNAME_FIELD = "email"
    objects = User_manager()

    def __str__(self):
        return self.email