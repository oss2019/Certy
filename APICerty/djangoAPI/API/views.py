import imp
from urllib import response
from django.shortcuts import render
import pandas as pd
from PIL import Image, ImageDraw, ImageFont
import base64

from rest_framework.response import Response
from rest_framework.views import APIView
#from excel import list
# Create your views here.
class View(APIView):
    def get(self, request,*args, **kwargs):
        data = pd.read_excel (r'list.xlsx')  
        name_list = data["Name"].tolist() 
        im = Image.open(r'test.jpg')
        d = ImageDraw.Draw(im)
        location = (100, 398)
        text_color = (0, 137, 209)
        font = ImageFont.truetype("arial.ttf", 120)
        d.text(location,name_list[0], fill = text_color, font = font)
        im.save("certificate_" + name_list[0] + ".pdf")
        return Response({'status':"Done"})
    


      