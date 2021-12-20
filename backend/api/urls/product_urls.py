from django.urls import path
from api.views import product_views as views

urlpatterns = [
    path('', views.getProducts, name='get-all-products'),
    path('<str:pk>/reviews/', views.createReview, name='create-review'),
    path('<str:pk>', views.getProduct, name='get-single-product-by-id')
]
