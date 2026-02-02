from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

client = MongoClient(os.getenv("MONGODB_URI"))
db = client[os.getenv("DB_NAME")]

employee_collection = db["employees"]
attendance_collection = db["attendances"]
