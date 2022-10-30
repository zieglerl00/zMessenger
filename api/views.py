from rest_framework.response import Response
from rest_framework.decorators import api_view

from api.models import *
from .serializers import *


@api_view(["GET"])
def get_shopping_list(request):
    items = ShoppingItem.objects.all()
    serializer = ShoppingItemSerializer(items, many=True)
    return Response(serializer.data)


@api_view(["POST"])
def add_shopping_item(request):
    serializer = ShoppingItemSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)
