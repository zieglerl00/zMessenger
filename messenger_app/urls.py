from django.contrib import admin
from django.urls import path

from .views import *

app_name = "messenger_app"

urlpatterns = [
    path('', index_messenger, name="index"),
    path('room/<int:pk>', change_room, name="room"),
    path('send-message/<int:pk>', send_message, name="send_message"),
    path('create_room/', create_room, name="create_room"),
]