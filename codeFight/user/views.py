from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import update_last_login
from .models import *
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
from django.core import serializers
from django.conf import settings
import json
import jwt
import time


@require_http_methods(["POST"])
def login(request):
    print("SE")
    if request.method == "POST":
        responseBody = {}
        requestBody = json.loads(request.body)

        try:
            user = User.objects.get(email=requestBody['email'])
        except User.DoesNotExist:
            user = None
            responseBody['status_code'] = 400
            responseBody['message'] = "User does not exist"
        if user:
            auth_user = authenticate(
                email=requestBody['email'], password=requestBody['password'])
            if auth_user:
                payload = {
                    'id': user.id,
                    'email': user.email,
                    'time': time.time()
                }
                encoded = jwt.encode(payload, settings.JWT_SECRET_KEY).decode('utf-8')
                jwt_token = {'apiToken': encoded, 'id': user.id}
                responseBody['status_code'] = 200
                responseBody['message'] = jwt_token
                update_last_login(None, user)
                user.is_active = True
                user.save()
            else:
                responseBody['status_code'] = 400
                responseBody['message'] = "Wrong credentials"
        return JsonResponse(responseBody)


@require_http_methods(['GET'])
def detail(request):
    if request.method == 'GET':
        responseBody = {}
        requestBody = json.loads(request.body)
        if requestBody['email']:
            user = User.objects.filter(email=requestBody['email']).values()
            responseBody['status_code'] = 200
            responseBody['message'] = list(user)
        else:
            responseBody['status_code'] = 400
            responseBody['message'] = 'No user found'
        return JsonResponse(responseBody)


@require_http_methods(["POST"])
def register(request):
    if request.method == 'POST':
        responseBody = {}
        requestBody = json.loads(request.body)

        if not requestBody['name']:
            responseBody['status_code'] = 400
            responseBody['message'] = 'Name is required'
        elif not requestBody['userName']:
            responseBody['status_code'] = 400
            responseBody['message'] = 'Username is required'
        elif not requestBody['email']:
            responseBody['status_code'] = 400
            responseBody['message'] = 'Email is required'
        elif not requestBody['phoneNumber']:
            responseBody['status_code'] = 400
            responseBody['message'] = 'Phone number is required'
        elif not requestBody['password']:
            responseBody['status_code'] = 400
            responseBody['message'] = 'password is required'
        else:
            emailExists = User.objects.filter(email=requestBody['email']).first()
            userNameExists = User.objects.filter(username=requestBody['userName']).first()
            phnoExists = User.objects.filter(
                phone_number=requestBody['phoneNumber']).first()

            if not emailExists and not phnoExists and not userNameExists:
                User.objects.create_user(
                    requestBody['name'], requestBody['userName'], requestBody['email'], requestBody['password'], requestBody['phoneNumber']
                )
                responseBody['status_code'] = 200
                responseBody['message'] = 'Account successfully created'

            else:
                if emailExists:
                    responseBody['status_code'] = 400
                    responseBody['message'] = 'Email must be unique'
                elif userNameExists:
                    responseBody['status_code'] = 400
                    responseBody['message'] = 'Username must be unique'
                else:
                    responseBody['status_code'] = 400
                    responseBody['message'] = 'Phone number must be unique'

        return JsonResponse(responseBody)
