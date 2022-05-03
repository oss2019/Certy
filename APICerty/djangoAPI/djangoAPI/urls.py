
from django.contrib import admin
from django.urls import path,include
from API.views import View
urlpatterns = [
    path('admin/', admin.site.urls),
    path('',View.as_view(),name='test'),  
]
