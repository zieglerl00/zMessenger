from django.contrib import admin
from django.urls import path

from .views import *

app_name = "users"

urlpatterns = [
    path('sign_up/', signup_view, name="signup"),
    path('sign_in/', signin_view, name="signin"),
    path('logout/', logout_view, name="logout"),

]