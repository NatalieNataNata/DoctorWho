"""
URL configuration for Backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path, include

# 这是整个 Django 项目的路由入口，通常你会在这里包含（include）各个 app 的路由。
urlpatterns = [
    path('admin/', admin.site.urls),
    # path('api/users/', include('api.urls')),
    path('api/users/', include('users.urls')),
    # 应该以斜杠结尾，特别是你要包含子路由时，Django 才能正确拼接路径。
]
