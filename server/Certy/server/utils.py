"""IMPORTING PYMONGO FOR DB CONNECTIONS"""
from pymongo import MongoClient

def get_db_handle(db_name):
    """FUNCTION THAT DOES THE DB CONNECTION"""
    client = MongoClient(db_name)
    db_handle = client['myFirstDatabase']['myFirstDatabase']
    return db_handle
