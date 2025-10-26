from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
from datetime import datetime
from enum import Enum
from sqlalchemy import Column, String, Integer, Float, Boolean, Text, JSON, DateTime, ForeignKey, Enum as SQLEnum
from sqlalchemy.orm import relationship
from database import Base
import json

# Enums
class PropertyType(str, Enum):
    VILLA = "villa"
    PENTHOUSE = "penthouse"
    ESTATE = "estate"
    LOFT = "loft"
    HOUSE = "house"

class PropertyStatus(str, Enum):
    FOR_SALE = "for-sale"
    FOR_RENT = "for-rent"

class InquiryType(str, Enum):
    PROPERTY_INQUIRY = "property-inquiry"
    GENERAL_CONTACT = "general-contact"

class InquiryStatus(str, Enum):
    NEW = "new"
    CONTACTED = "contacted"
    CLOSED = "closed"

class ValuationStatus(str, Enum):
    PENDING = "pending"
    COMPLETED = "completed"

# SQLAlchemy Database Models
class DBAgent(Base):
    __tablename__ = "agents"

    id = Column(String(36), primary_key=True)
    name = Column(String(255), nullable=False)
    title = Column(String(255), nullable=False)
    image = Column(Text)
    email = Column(String(255), nullable=False, unique=True)
    phone = Column(String(50), nullable=False)
    bio = Column(Text)
    specialties = Column(JSON)
    listings = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    properties = relationship("DBProperty", back_populates="agent_obj")

class DBProperty(Base):
    __tablename__ = "properties"

    id = Column(String(36), primary_key=True)
    title = Column(String(255), nullable=False)
    type = Column(SQLEnum(PropertyType), nullable=False)
    status = Column(SQLEnum(PropertyStatus), nullable=False)
    price = Column(Float, nullable=False)
    location = Column(String(255), nullable=False)
    bedrooms = Column(Integer, nullable=False)
    bathrooms = Column(Integer, nullable=False)
    area = Column(Float, nullable=False)
    image = Column(Text)
    images = Column(JSON)
    description = Column(Text)
    features = Column(JSON)
    agent_id = Column(String(36), ForeignKey('agents.id'))
    featured = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    agent_obj = relationship("DBAgent", back_populates="properties")

class DBInquiry(Base):
    __tablename__ = "inquiries"

    id = Column(String(36), primary_key=True)
    property_id = Column(String(36), ForeignKey('properties.id'))
    name = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False)
    phone = Column(String(50), nullable=False)
    message = Column(Text, nullable=False)
    type = Column(SQLEnum(InquiryType), nullable=False)
    status = Column(SQLEnum(InquiryStatus), default=InquiryStatus.NEW)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class DBValuation(Base):
    __tablename__ = "valuations"

    id = Column(String(36), primary_key=True)
    name = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False)
    phone = Column(String(50), nullable=False)
    property_type = Column(String(100), nullable=False)
    address = Column(Text, nullable=False)
    bedrooms = Column(Integer, nullable=False)
    bathrooms = Column(Integer, nullable=False)
    area = Column(Float, nullable=False)
    year_built = Column(Integer)
    additional_info = Column(Text)
    status = Column(SQLEnum(ValuationStatus), default=ValuationStatus.PENDING)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class DBTestimonial(Base):
    __tablename__ = "testimonials"

    id = Column(String(36), primary_key=True)
    name = Column(String(255), nullable=False)
    role = Column(String(255), nullable=False)
    content = Column(Text, nullable=False)
    rating = Column(Integer, default=5)
    image = Column(Text)
    approved = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

# Pydantic Models for API (Request/Response)
class Property(BaseModel):
    id: str = Field(alias="_id")
    title: str
    type: PropertyType
    status: PropertyStatus
    price: float
    location: str
    bedrooms: int
    bathrooms: int
    area: float
    image: str
    images: List[str]
    description: str
    features: List[str]
    agent: str
    featured: bool = False
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        populate_by_name = True
        from_attributes = True

class PropertyCreate(BaseModel):
    title: str
    type: PropertyType
    status: PropertyStatus
    price: float
    location: str
    bedrooms: int
    bathrooms: int
    area: float
    image: str
    images: List[str]
    description: str
    features: List[str]
    agent: str
    featured: bool = False

class Agent(BaseModel):
    id: str = Field(alias="_id")
    name: str
    title: str
    image: str
    email: EmailStr
    phone: str
    bio: str
    specialties: List[str]
    listings: int = 0
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        populate_by_name = True
        from_attributes = True

class AgentCreate(BaseModel):
    name: str
    title: str
    image: str
    email: EmailStr
    phone: str
    bio: str
    specialties: List[str]

class Inquiry(BaseModel):
    id: str = Field(alias="_id")
    property_id: Optional[str] = None
    name: str
    email: EmailStr
    phone: str
    message: str
    type: InquiryType
    status: InquiryStatus = InquiryStatus.NEW
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        populate_by_name = True
        from_attributes = True

class InquiryCreate(BaseModel):
    property_id: Optional[str] = None
    name: str
    email: EmailStr
    phone: str
    message: str
    type: InquiryType = InquiryType.GENERAL_CONTACT

class Valuation(BaseModel):
    id: str = Field(alias="_id")
    name: str
    email: EmailStr
    phone: str
    property_type: str
    address: str
    bedrooms: int
    bathrooms: int
    area: float
    year_built: Optional[int] = None
    additional_info: Optional[str] = None
    status: ValuationStatus = ValuationStatus.PENDING
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        populate_by_name = True
        from_attributes = True

class ValuationCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    property_type: str
    address: str
    bedrooms: int
    bathrooms: int
    area: float
    year_built: Optional[int] = None
    additional_info: Optional[str] = None

class Testimonial(BaseModel):
    id: str = Field(alias="_id")
    name: str
    role: str
    content: str
    rating: int = 5
    image: str
    approved: bool = False
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        populate_by_name = True
        from_attributes = True

class TestimonialCreate(BaseModel):
    name: str
    role: str
    content: str
    rating: int = 5
    image: str

class Stats(BaseModel):
    total_properties: int
    total_sales: int
    total_clients: int
    years_experience: int

# Helper functions to convert SQLAlchemy models to Pydantic models
def db_to_pydantic_property(db_property: DBProperty) -> Property:
    return Property(
        _id=db_property.id,
        title=db_property.title,
        type=db_property.type,
        status=db_property.status,
        price=db_property.price,
        location=db_property.location,
        bedrooms=db_property.bedrooms,
        bathrooms=db_property.bathrooms,
        area=db_property.area,
        image=db_property.image,
        images=db_property.images if isinstance(db_property.images, list) else json.loads(db_property.images or '[]'),
        description=db_property.description,
        features=db_property.features if isinstance(db_property.features, list) else json.loads(db_property.features or '[]'),
        agent=db_property.agent_id,
        featured=db_property.featured,
        created_at=db_property.created_at,
        updated_at=db_property.updated_at
    )

def db_to_pydantic_agent(db_agent: DBAgent) -> Agent:
    return Agent(
        _id=db_agent.id,
        name=db_agent.name,
        title=db_agent.title,
        image=db_agent.image,
        email=db_agent.email,
        phone=db_agent.phone,
        bio=db_agent.bio,
        specialties=db_agent.specialties if isinstance(db_agent.specialties, list) else json.loads(db_agent.specialties or '[]'),
        listings=db_agent.listings,
        created_at=db_agent.created_at,
        updated_at=db_agent.updated_at
    )

def db_to_pydantic_inquiry(db_inquiry: DBInquiry) -> Inquiry:
    return Inquiry(
        _id=db_inquiry.id,
        property_id=db_inquiry.property_id,
        name=db_inquiry.name,
        email=db_inquiry.email,
        phone=db_inquiry.phone,
        message=db_inquiry.message,
        type=db_inquiry.type,
        status=db_inquiry.status,
        created_at=db_inquiry.created_at,
        updated_at=db_inquiry.updated_at
    )

def db_to_pydantic_valuation(db_valuation: DBValuation) -> Valuation:
    return Valuation(
        _id=db_valuation.id,
        name=db_valuation.name,
        email=db_valuation.email,
        phone=db_valuation.phone,
        property_type=db_valuation.property_type,
        address=db_valuation.address,
        bedrooms=db_valuation.bedrooms,
        bathrooms=db_valuation.bathrooms,
        area=db_valuation.area,
        year_built=db_valuation.year_built,
        additional_info=db_valuation.additional_info,
        status=db_valuation.status,
        created_at=db_valuation.created_at,
        updated_at=db_valuation.updated_at
    )

def db_to_pydantic_testimonial(db_testimonial: DBTestimonial) -> Testimonial:
    return Testimonial(
        _id=db_testimonial.id,
        name=db_testimonial.name,
        role=db_testimonial.role,
        content=db_testimonial.content,
        rating=db_testimonial.rating,
        image=db_testimonial.image,
        approved=db_testimonial.approved,
        created_at=db_testimonial.created_at,
        updated_at=db_testimonial.updated_at
    )
