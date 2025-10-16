import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
from pathlib import Path
from seed_data import ROHAN_AGENT, PROPERTIES, TESTIMONIALS
from datetime import datetime

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

async def seed_database():
    """Seed the database with initial data"""
    
    # MongoDB connection
    mongo_url = os.environ['MONGO_URL']
    client = AsyncIOMotorClient(mongo_url)
    db = client[os.environ['DB_NAME']]
    
    print("Starting database seeding...")
    
    # Clear existing collections
    await db.properties.delete_many({})
    await db.agents.delete_many({})
    await db.testimonials.delete_many({})
    print("✓ Cleared existing collections")
    
    # Add timestamps to data
    now = datetime.utcnow()
    
    # Seed Agent (Rohan Darji)
    agent_data = ROHAN_AGENT.copy()
    agent_data['created_at'] = now
    agent_data['updated_at'] = now
    await db.agents.insert_one(agent_data)
    print(f"✓ Seeded agent: {agent_data['name']}")
    
    # Seed Properties
    properties_with_timestamps = []
    for prop in PROPERTIES:
        prop_data = prop.copy()
        prop_data['created_at'] = now
        prop_data['updated_at'] = now
        properties_with_timestamps.append(prop_data)
    
    await db.properties.insert_many(properties_with_timestamps)
    print(f"✓ Seeded {len(properties_with_timestamps)} properties")
    
    # Seed Testimonials
    testimonials_with_timestamps = []
    for testimonial in TESTIMONIALS:
        test_data = testimonial.copy()
        test_data['created_at'] = now
        test_data['updated_at'] = now
        testimonials_with_timestamps.append(test_data)
    
    await db.testimonials.insert_many(testimonials_with_timestamps)
    print(f"✓ Seeded {len(testimonials_with_timestamps)} testimonials")
    
    print("\n✅ Database seeding completed successfully!")
    
    # Close connection
    client.close()

if __name__ == "__main__":
    asyncio.run(seed_database())
