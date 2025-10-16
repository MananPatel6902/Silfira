from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
from datetime import datetime
from enum import Enum

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

# Property Models
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

# Agent Models
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

class AgentCreate(BaseModel):
    name: str
    title: str
    image: str
    email: EmailStr
    phone: str
    bio: str
    specialties: List[str]

# Inquiry Models
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

class InquiryCreate(BaseModel):
    property_id: Optional[str] = None
    name: str
    email: EmailStr
    phone: str
    message: str
    type: InquiryType = InquiryType.GENERAL_CONTACT

# Valuation Models
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

# Testimonial Models
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

class TestimonialCreate(BaseModel):
    name: str
    role: str
    content: str
    rating: int = 5
    image: str

# Stats Model
class Stats(BaseModel):
    total_properties: int
    total_sales: int
    total_clients: int
    years_experience: int
