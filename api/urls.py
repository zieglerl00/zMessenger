from django.urls import path

from . import views

urlpatterns = [
    path('', views.get_shopping_list),
    path('add/', views.add_shopping_item),
    path('delete/', views.remove_shopping_item),
]
