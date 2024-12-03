from .base_model import BaseModel
from . import mongo

class Users(BaseModel):
    def __init__(self):
        super().__init__()
    
    def access_collection():
        return mongo.db.users
            