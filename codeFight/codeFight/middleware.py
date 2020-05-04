from django.conf import settings
from django.http import JsonResponse
from user.models import *
import json
import jwt


def authenticate_credentials(token):
    try:
        payload = jwt.decode(token, settings.JWT_SECRET_KEY)
        email = payload['email']
        userId = payload['id']
    except:
        email = None
        userId = None
    return (userId, email)

def notSubUrl(path, exemptList):
    result = True
    for item in exemptList:
        if item.count(path) or path.count(item) :
            result = False
    return result



class LoginRequiredMiddleware ():
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        return response

    def process_view(self, request, view_func, view_args, view_kwargs):
        responseBody = {}
        if request.path_info not in settings.LOGIN_EXEMPT_URL and notSubUrl(request.path_info,settings.LOGIN_EXEMPT_URL):
            requestBody = json.loads(request.body)
            if not "token" in requestBody:
                responseBody['status_code'] = 400
                responseBody['message'] = "Access denied"
            else:
                userId, email = authenticate_credentials(
                    requestBody['token'])
                if not requestBody['userId'] == userId:
                    responseBody['status_code'] = 400
                    responseBody['message'] = "Access denied"
                else:
                    try:
                        user = User.objects.get(
                            email=email,
                            id=userId
                        )
                    except User.DoesNotExist:
                        responseBody['status_code'] = 500
                        responseBody['message'] = "Internal server error"
            
        if not responseBody == {}:
            return JsonResponse(responseBody)
        return None
