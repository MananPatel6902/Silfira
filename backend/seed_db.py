import asyncio
import os
from dotenv import load_dotenv
from pathlib import Path
from seed_data import ROHAN_AGENT, PROPERTIES, TESTIMONIALS
from datetime import datetime
from sqlalchemy.ext.asyncio import create_async_engine
from database import Base, AsyncSessionLocal
from models import DBAgent, DBProperty, DBTestimonial

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

async def seed_database():
    """Seed the database with initial data"""

    # Get database URL
    MYSQL_URL = os.environ.get('MYSQL_URL', 'mysql+aiomysql://root:password@localhost:3306/silfira_realtors')

    # Create engine
    engine = create_async_engine(MYSQL_URL, echo=True)

    print("Starting database seeding...")

    # Create all tables
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
        await conn.run_sync(Base.metadata.create_all)
    print("✓ Created database tables")

    # Create session
    async with AsyncSessionLocal() as session:
        now = datetime.utcnow()

        # Seed Agent (Rohan Darji)
        agent_data = ROHAN_AGENT.copy()
        db_agent = DBAgent(
            id=agent_data['_id'],
            name=agent_data['name'],
            title=agent_data['title'],
            image=agent_data['image'],
            email=agent_data['email'],
            phone=agent_data['phone'],
            bio=agent_data['bio'],
            specialties=agent_data['specialties'],
            listings=agent_data['listings'],
            created_at=now,
            updated_at=now
        )
        session.add(db_agent)
        print(f"✓ Seeded agent: {agent_data['name']}")

        # Seed Properties
        for prop in PROPERTIES:
            db_property = DBProperty(
                id=prop['_id'],
                title=prop['title'],
                type=prop['type'],
                status=prop['status'],
                price=prop['price'],
                location=prop['location'],
                bedrooms=prop['bedrooms'],
                bathrooms=prop['bathrooms'],
                area=prop['area'],
                image=prop['image'],
                images=prop['images'],
                description=prop['description'],
                features=prop['features'],
                agent_id=prop['agent'],
                featured=prop['featured'],
                created_at=now,
                updated_at=now
            )
            session.add(db_property)

        print(f"✓ Seeded {len(PROPERTIES)} properties")

        # Seed Testimonials
        for testimonial in TESTIMONIALS:
            db_testimonial = DBTestimonial(
                id=testimonial['_id'],
                name=testimonial['name'],
                role=testimonial['role'],
                content=testimonial['content'],
                rating=testimonial['rating'],
                image=testimonial['image'],
                approved=testimonial['approved'],
                created_at=now,
                updated_at=now
            )
            session.add(db_testimonial)

        print(f"✓ Seeded {len(TESTIMONIALS)} testimonials")

        # Commit all changes
        await session.commit()
        print("\n✅ Database seeding completed successfully!")

    # Close engine
    await engine.dispose()

if __name__ == "__main__":
    asyncio.run(seed_database())
