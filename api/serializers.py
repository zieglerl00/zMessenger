from rest_framework import serializers
from api.models import ShoppingItem


class ShoppingItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShoppingItem
        fields = "__all__"
