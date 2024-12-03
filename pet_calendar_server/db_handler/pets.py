from .base_model import BaseModel
from . import mongo

class Pets(BaseModel):
    def __init__(self):
        super().__init__()
    
    def access_collection():
        return mongo.db.pets
            