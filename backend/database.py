from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine, async_sessionmaker
import os
from datetime import datetime
import uuid

# MySQL connection
MYSQL_URL = os.environ.get('MYSQL_URL', 'mysql+aiomysql://root:password@localhost:3306/silfira_realtors')

# Create async engine
engine = create_async_engine(
    MYSQL_URL,
    echo=False,
    pool_pre_ping=True,
    pool_recycle=3600,
)

# Create async session factory
AsyncSessionLocal = async_sessionmaker(
    engine,
    class_=AsyncSession,
    expire_on_commit=False
)

# Base class for models
Base = declarative_base()

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

# Dependency to get database session
async def get_db():
    async with AsyncSessionLocal() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise
        finally:
            await session.close()
