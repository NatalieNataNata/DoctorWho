# Backend/users/urls.py

from django.urls import path
from .views import login  # 你实现的登录视图函数

urlpatterns = [
    path('login/', login, name='user-login'),  # 具体接口路径 /api/users/login/
]
