from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .utils import *

# Create your views here.
@api_view(['POST'])
def makeCertificates(request):
    db= get_db_handle('mongodb+srv://Samy:certy1234@cluster0.c6jhn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
    return Response({"message": "Hello, world!"})
