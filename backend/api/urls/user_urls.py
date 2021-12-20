from django.urls import path
from api.views import user_views as views

urlpatterns = [
    path('register/', views.registerUser, name='register'),
    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('', views.getUsers, name='users'),
    path('profile/', views.getUserProfile, name='profile'),
    path('profile/update/', views.updateUserProfile, name='update_profile')
]