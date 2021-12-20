from django.contrib import admin
from django.urls import path, include
from django.urls.conf import include
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    
    path('api-auth/', include('rest_framework.urls')),
    path('admin/', admin.site.urls),
    path('api/products/', include('api.urls.product_urls')),
    path('api/users/', include('api.urls.user_urls')),
    path('api/orders/', include('api.urls.order_urls')),
]

urlpatterns += static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)