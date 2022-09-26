import pandas as pd
import json
import sys
import os
from PIL import Image, ImageDraw, ImageFont
from pymongo import MongoClient
from bson.binary import Binary

fileName = sys.argv[1]
templateName = sys.argv[2]
filejson = fileName + ".json"

f = open("Temp/" + filejson,)
data = json.load(f)


try:
    conn = MongoClient('mongodb://localhost:27017/')
    print("Connected successfully!!!")
except:  
    print("Could not connect to MongoDB")

db = conn.certy
collection = db.certificates


for i in data:
    k = 0
    for j in data[i]:
        if(k != 0):
            temp_dict = {}
            temp_dict['name'] = j[0]
            temp_dict['sheetName'] = fileName
            id_ = collection.insert_one(temp_dict).inserted_id
            uid = str(id_)

            path = "Output/" + fileName + "/" + i + "/"

            
            im = Image.open(r'Templates/' + templateName +'.jpg')
            d = ImageDraw.Draw(im)
            location = (450,400)
            location2 = (1600,1300)
            text_color = (54, 59, 158)
            font = ImageFont.truetype("arial.ttf", 120)
            font2 = ImageFont.truetype("arial.ttf", 60)
            d.text(location, j[0], fill = text_color, font = font)
            d.text(location2, uid, fill = text_color, font = font2)
            
            isExist = os.path.exists(path)
            if not isExist:
                os.makedirs(path)
            im.save(path+"certificate_" + j[0] + ".pdf")

            file_name = path+"certificate_" + j[0] + ".pdf"
            with open(file_name, "rb") as f:
                encoded = Binary(f.read())

            collection.update_one({'_id':id_},{'$set':{'file':encoded, 'fileName':"certificate_" + j[0] + ".pdf"}})    
        k = k + 1

