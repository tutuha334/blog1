"""blog URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
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
from django.urls import path
from web_blog.views import index as index
from web_blog.views import profile as profile
from web_blog.views import auth as auth
from web_blog.views import subs as subs
from web_blog.views import user_page as user_page
from web_blog.views import subs_page as subs_page

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', index),
    path('', profile),
    path('subscriptions/', subs),
    path('subscribers/', subs),
    path('auth_cl_serv/', auth),
    path('user_page_cl_serv/', user_page),
    path('subs_page_cl_serv/', subs_page),
]
