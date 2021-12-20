from django.urls import path
from api.views import order_views

urlpatterns = [
    path('add/', order_views.addOrderItems, name='add_order_iem'),
    path('<str:pk>/', order_views.getOrderById, name='get_order_by_id'),
    path('<str:pk>/pay/', order_views.updateOrderToPaid, name='pay')
]