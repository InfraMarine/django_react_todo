from django.http import request
from django.contrib.auth.models import User
from .serializers import LoginSerializer, UserSerializer
from django.contrib.auth import login, logout, authenticate
from django.views.decorators.csrf import ensure_csrf_cookie
from django.http import JsonResponse
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny


class CheckAuthView(APIView):
    permission_classes = [IsAuthenticated,]

    def get(self, request):
        return JsonResponse(UserSerializer(request.user).data, status=200)


class RegisterView(generics.CreateAPIView):
    permission_classes = (AllowAny,)
    queryset = User.objects.all()
    serializer_class = UserSerializer
 

class LoginView(generics.GenericAPIView):
    permission_classes = (AllowAny,)
    serializer_class = LoginSerializer

    def post(self, request):
        user_serializer = LoginSerializer(data=request.data)
        if not user_serializer.is_valid():
            return JsonResponse(user_serializer.errors, status=401)
        username = request.data.get('username', None)
        password = request.data.get('password', None)
        user = authenticate(username=username, password=password)
        login(request, user)
        return JsonResponse(user_serializer.validated_data, status=200)


class LogoutView(APIView):
    permission_classes = [IsAuthenticated,]

    def get(self, request):
        logout(request)
        return JsonResponse({'detail':"logged out"},status=200)