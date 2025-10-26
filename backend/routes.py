from fastapi import APIRouter, HTTPException, Query, Depends
from typing import List, Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from models import (
    Property, PropertyCreate, Agent, AgentCreate,
    Inquiry, InquiryCreate, Valuation, ValuationCreate,
    Testimonial, Stats, PropertyType, PropertyStatus,
    DBProperty, DBAgent, DBInquiry, DBValuation, DBTestimonial,
    db_to_pydantic_property, db_to_pydantic_agent, db_to_pydantic_inquiry,
    db_to_pydantic_valuation, db_to_pydantic_testimonial
)
from database import get_db, generate_id
from datetime import datetime

router = APIRouter()

# Properties Routes
@router.get("/properties", response_model=List[Property])
async def get_properties(
    type: Optional[PropertyType] = None,
    status: Optional[PropertyStatus] = None,
    min_price: Optional[float] = Query(None, alias="minPrice"),
    max_price: Optional[float] = Query(None, alias="maxPrice"),
    location: Optional[str] = None,
    featured: Optional[bool] = None,
    db: AsyncSession = Depends(get_db)
):
    """Get all properties with optional filters"""
    query = select(DBProperty)

    if type:
        query = query.where(DBProperty.type == type)
    if status:
        query = query.where(DBProperty.status == status)
    if min_price is not None:
        query = query.where(DBProperty.price >= min_price)
    if max_price is not None:
        query = query.where(DBProperty.price <= max_price)
    if location:
        query = query.where(DBProperty.location.like(f"%{location}%"))
    if featured is not None:
        query = query.where(DBProperty.featured == featured)

    result = await db.execute(query)
    properties = result.scalars().all()

    return [db_to_pydantic_property(prop) for prop in properties]

@router.get("/properties/{property_id}", response_model=Property)
async def get_property(property_id: str, db: AsyncSession = Depends(get_db)):
    """Get single property by ID"""
    result = await db.execute(select(DBProperty).where(DBProperty.id == property_id))
    property_data = result.scalar_one_or_none()

    if not property_data:
        raise HTTPException(status_code=404, detail="Property not found")

    return db_to_pydantic_property(property_data)

@router.post("/properties", response_model=Property)
async def create_property(property: PropertyCreate, db: AsyncSession = Depends(get_db)):
    """Create new property"""
    now = datetime.utcnow()

    db_property = DBProperty(
        id=generate_id(),
        title=property.title,
        type=property.type,
        status=property.status,
        price=property.price,
        location=property.location,
        bedrooms=property.bedrooms,
        bathrooms=property.bathrooms,
        area=property.area,
        image=property.image,
        images=property.images,
        description=property.description,
        features=property.features,
        agent_id=property.agent,
        featured=property.featured,
        created_at=now,
        updated_at=now
    )

    db.add(db_property)
    await db.commit()
    await db.refresh(db_property)

    return db_to_pydantic_property(db_property)

# Agents Routes
@router.get("/agents", response_model=List[Agent])
async def get_agents(db: AsyncSession = Depends(get_db)):
    """Get all agents"""
    result = await db.execute(select(DBAgent))
    agents = result.scalars().all()

    return [db_to_pydantic_agent(agent) for agent in agents]

@router.get("/agents/{agent_id}", response_model=Agent)
async def get_agent(agent_id: str, db: AsyncSession = Depends(get_db)):
    """Get single agent by ID"""
    result = await db.execute(select(DBAgent).where(DBAgent.id == agent_id))
    agent = result.scalar_one_or_none()

    if not agent:
        raise HTTPException(status_code=404, detail="Agent not found")

    return db_to_pydantic_agent(agent)

# Inquiries Routes
@router.post("/inquiries", response_model=Inquiry)
async def create_inquiry(inquiry: InquiryCreate, db: AsyncSession = Depends(get_db)):
    """Submit property inquiry or contact form"""
    now = datetime.utcnow()

    db_inquiry = DBInquiry(
        id=generate_id(),
        property_id=inquiry.property_id,
        name=inquiry.name,
        email=inquiry.email,
        phone=inquiry.phone,
        message=inquiry.message,
        type=inquiry.type,
        status="new",
        created_at=now,
        updated_at=now
    )

    db.add(db_inquiry)
    await db.commit()
    await db.refresh(db_inquiry)

    return db_to_pydantic_inquiry(db_inquiry)

@router.get("/inquiries", response_model=List[Inquiry])
async def get_inquiries(db: AsyncSession = Depends(get_db)):
    """Get all inquiries (Admin only)"""
    result = await db.execute(
        select(DBInquiry).order_by(DBInquiry.created_at.desc())
    )
    inquiries = result.scalars().all()

    return [db_to_pydantic_inquiry(inq) for inq in inquiries]

# Valuations Routes
@router.post("/valuations", response_model=Valuation)
async def create_valuation(valuation: ValuationCreate, db: AsyncSession = Depends(get_db)):
    """Submit property valuation request"""
    now = datetime.utcnow()

    db_valuation = DBValuation(
        id=generate_id(),
        name=valuation.name,
        email=valuation.email,
        phone=valuation.phone,
        property_type=valuation.property_type,
        address=valuation.address,
        bedrooms=valuation.bedrooms,
        bathrooms=valuation.bathrooms,
        area=valuation.area,
        year_built=valuation.year_built,
        additional_info=valuation.additional_info,
        status="pending",
        created_at=now,
        updated_at=now
    )

    db.add(db_valuation)
    await db.commit()
    await db.refresh(db_valuation)

    return db_to_pydantic_valuation(db_valuation)

@router.get("/valuations", response_model=List[Valuation])
async def get_valuations(db: AsyncSession = Depends(get_db)):
    """Get all valuation requests (Admin only)"""
    result = await db.execute(
        select(DBValuation).order_by(DBValuation.created_at.desc())
    )
    valuations = result.scalars().all()

    return [db_to_pydantic_valuation(val) for val in valuations]

# Testimonials Routes
@router.get("/testimonials", response_model=List[Testimonial])
async def get_testimonials(db: AsyncSession = Depends(get_db)):
    """Get all approved testimonials"""
    result = await db.execute(
        select(DBTestimonial).where(DBTestimonial.approved == True)
    )
    testimonials = result.scalars().all()

    return [db_to_pydantic_testimonial(test) for test in testimonials]

# Stats Route
@router.get("/stats", response_model=Stats)
async def get_stats(db: AsyncSession = Depends(get_db)):
    """Get website statistics"""
    result = await db.execute(select(func.count()).select_from(DBProperty))
    total_properties = result.scalar()

    stats = {
        "total_properties": total_properties,
        "total_sales": 2500,  # Static for now
        "total_clients": 1800,  # Static for now
        "years_experience": 25  # Static for now
    }

    return stats
