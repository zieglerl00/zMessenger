import json

from django.contrib.auth.decorators import login_required
from django.core import serializers
from django.http import JsonResponse
from django.shortcuts import render
from .models import *

# Create your views here.


def index_messenger(request):
    rooms = Room.objects.all().order_by('pk')
    return render(request, 'messenger_app/messenger_base.html', {
        "rooms": rooms
    })


def change_room(request, pk):
    room_messages = Message.objects.filter(room__id=pk)
    users = User.objects.filter(message__room_id=pk)

    # messages_reversed = reversed(room_messages)
    # users_reversed = reversed(users)

    room_messages = serializers.serialize('json', room_messages)
    users = serializers.serialize('json', users)

    # print(messages_reversed)
    # print(users_reversed)

    return JsonResponse({
        "data": room_messages,
        "users": users
    })


def send_message(request, pk):
    user = request.user
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    message = body['msg']
    new_message = Message(message=message, user=user, room_id=pk)
    new_message.save()

    return JsonResponse({"data": "data"})
