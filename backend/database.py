from motor.motor_asyncio import AsyncIOMotorClient
import os
from datetime import datetime
import uuid

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Collections
properties_collection = db.properties
agents_collection = db.agents
inquiries_collection = db.inquiries
valuations_collection = db.valuations
testimonials_collection = db.testimonials

# Helper function to generate ID
def generate_id():
    return str(uuid.uuid4())

# Helper function to add timestamps
def add_timestamps(data: dict, update: bool = False):
    now = datetime.utcnow()
    if not update:
        data['created_at'] = now
    data['updated_at'] = now
    return data
