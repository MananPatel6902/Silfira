from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from models import (
    Property, PropertyCreate, Agent, AgentCreate,
    Inquiry, InquiryCreate, Valuation, ValuationCreate,
    Testimonial, Stats, PropertyType, PropertyStatus
)
from database import (
    properties_collection, agents_collection, inquiries_collection,
    valuations_collection, testimonials_collection, generate_id, add_timestamps
)

router = APIRouter()

# Properties Routes
@router.get("/properties", response_model=List[Property])
async def get_properties(
    type: Optional[PropertyType] = None,
    status: Optional[PropertyStatus] = None,
    min_price: Optional[float] = Query(None, alias="minPrice"),
    max_price: Optional[float] = Query(None, alias="maxPrice"),
    location: Optional[str] = None,
    featured: Optional[bool] = None
):
    """Get all properties with optional filters"""
    query = {}
    
    if type:
        query["type"] = type
    if status:
        query["status"] = status
    if min_price is not None:
        query["price"] = {"$gte": min_price}
    if max_price is not None:
        if "price" in query:
            query["price"]["$lte"] = max_price
        else:
            query["price"] = {"$lte": max_price}
    if location:
        query["location"] = {"$regex": location, "$options": "i"}
    if featured is not None:
        query["featured"] = featured
    
    properties = await properties_collection.find(query).to_list(1000)
    return properties

@router.get("/properties/{property_id}", response_model=Property)
async def get_property(property_id: str):
    """Get single property by ID"""
    property_data = await properties_collection.find_one({"_id": property_id})
    if not property_data:
        raise HTTPException(status_code=404, detail="Property not found")
    return property_data

@router.post("/properties", response_model=Property)
async def create_property(property: PropertyCreate):
    """Create new property"""
    property_dict = property.dict()
    property_dict["_id"] = generate_id()
    property_dict = add_timestamps(property_dict)
    
    await properties_collection.insert_one(property_dict)
    return property_dict

# Agents Routes
@router.get("/agents", response_model=List[Agent])
async def get_agents():
    """Get all agents"""
    agents = await agents_collection.find().to_list(100)
    return agents

@router.get("/agents/{agent_id}", response_model=Agent)
async def get_agent(agent_id: str):
    """Get single agent by ID"""
    agent = await agents_collection.find_one({"_id": agent_id})
    if not agent:
        raise HTTPException(status_code=404, detail="Agent not found")
    return agent

# Inquiries Routes
@router.post("/inquiries", response_model=Inquiry)
async def create_inquiry(inquiry: InquiryCreate):
    """Submit property inquiry or contact form"""
    inquiry_dict = inquiry.dict()
    inquiry_dict["_id"] = generate_id()
    inquiry_dict["status"] = "new"
    inquiry_dict = add_timestamps(inquiry_dict)
    
    await inquiries_collection.insert_one(inquiry_dict)
    return inquiry_dict

@router.get("/inquiries", response_model=List[Inquiry])
async def get_inquiries():
    """Get all inquiries (Admin only)"""
    inquiries = await inquiries_collection.find().sort("created_at", -1).to_list(1000)
    return inquiries

# Valuations Routes
@router.post("/valuations", response_model=Valuation)
async def create_valuation(valuation: ValuationCreate):
    """Submit property valuation request"""
    valuation_dict = valuation.dict()
    valuation_dict["_id"] = generate_id()
    valuation_dict["status"] = "pending"
    valuation_dict = add_timestamps(valuation_dict)
    
    await valuations_collection.insert_one(valuation_dict)
    return valuation_dict

@router.get("/valuations", response_model=List[Valuation])
async def get_valuations():
    """Get all valuation requests (Admin only)"""
    valuations = await valuations_collection.find().sort("created_at", -1).to_list(1000)
    return valuations

# Testimonials Routes
@router.get("/testimonials", response_model=List[Testimonial])
async def get_testimonials():
    """Get all approved testimonials"""
    testimonials = await testimonials_collection.find({"approved": True}).to_list(100)
    return testimonials

# Stats Route
@router.get("/stats", response_model=Stats)
async def get_stats():
    """Get website statistics"""
    total_properties = await properties_collection.count_documents({})
    
    # Calculate stats
    stats = {
        "total_properties": total_properties,
        "total_sales": 2500,  # Static for now
        "total_clients": 1800,  # Static for now
        "years_experience": 25  # Static for now
    }
    
    return stats
