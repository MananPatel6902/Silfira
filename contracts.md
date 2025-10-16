# API Contracts & Integration Plan - Silfira Realtors

## Overview
This document outlines the backend API endpoints, database models, and frontend integration for the Silfira Realtors real estate website.

## Database Models

### 1. Property Model
```javascript
{
  _id: ObjectId,
  title: String (required),
  type: String (enum: villa, penthouse, estate, loft, house),
  status: String (enum: for-sale, for-rent),
  price: Number (required),
  location: String (required),
  bedrooms: Number (required),
  bathrooms: Number (required),
  area: Number (required),
  image: String (URL),
  images: [String] (array of URLs),
  description: String,
  features: [String],
  agentId: String (references agent),
  featured: Boolean (default: false),
  createdAt: Date,
  updatedAt: Date
}
```

### 2. Agent Model
```javascript
{
  _id: ObjectId,
  name: String (required),
  title: String (required),
  image: String (URL),
  email: String (required, unique),
  phone: String (required),
  bio: String,
  specialties: [String],
  listings: Number (default: 0),
  createdAt: Date,
  updatedAt: Date
}
```

### 3. Inquiry Model
```javascript
{
  _id: ObjectId,
  propertyId: String (optional, references property),
  name: String (required),
  email: String (required),
  phone: String (required),
  message: String (required),
  type: String (enum: property-inquiry, general-contact),
  status: String (enum: new, contacted, closed, default: new),
  createdAt: Date,
  updatedAt: Date
}
```

### 4. Valuation Model
```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required),
  phone: String (required),
  propertyType: String (required),
  address: String (required),
  bedrooms: Number (required),
  bathrooms: Number (required),
  area: Number (required),
  yearBuilt: Number,
  additionalInfo: String,
  status: String (enum: pending, completed, default: pending),
  createdAt: Date,
  updatedAt: Date
}
```

### 5. Testimonial Model
```javascript
{
  _id: ObjectId,
  name: String (required),
  role: String (required),
  content: String (required),
  rating: Number (1-5),
  image: String (URL),
  approved: Boolean (default: false),
  createdAt: Date,
  updatedAt: Date
}
```

## API Endpoints

### Properties API (`/api/properties`)

#### GET /api/properties
- **Description**: Get all properties with optional filters
- **Query Params**: 
  - type (optional): villa, penthouse, estate, loft, house
  - status (optional): for-sale, for-rent
  - minPrice (optional): number
  - maxPrice (optional): number
  - location (optional): string
  - featured (optional): boolean
- **Response**: Array of property objects

#### GET /api/properties/:id
- **Description**: Get single property by ID
- **Response**: Property object

#### POST /api/properties (Admin only - future feature)
- **Description**: Create new property
- **Body**: Property data
- **Response**: Created property object

#### PUT /api/properties/:id (Admin only - future feature)
- **Description**: Update property
- **Body**: Updated property data
- **Response**: Updated property object

#### DELETE /api/properties/:id (Admin only - future feature)
- **Description**: Delete property
- **Response**: Success message

### Agent API (`/api/agents`)

#### GET /api/agents
- **Description**: Get all agents
- **Response**: Array of agent objects

#### GET /api/agents/:id
- **Description**: Get single agent by ID
- **Response**: Agent object

### Inquiry API (`/api/inquiries`)

#### POST /api/inquiries
- **Description**: Submit property inquiry or contact form
- **Body**: 
  ```javascript
  {
    propertyId: String (optional),
    name: String,
    email: String,
    phone: String,
    message: String,
    type: String
  }
  ```
- **Response**: Created inquiry object

#### GET /api/inquiries (Admin only - future feature)
- **Description**: Get all inquiries
- **Response**: Array of inquiry objects

### Valuation API (`/api/valuations`)

#### POST /api/valuations
- **Description**: Submit property valuation request
- **Body**: 
  ```javascript
  {
    name: String,
    email: String,
    phone: String,
    propertyType: String,
    address: String,
    bedrooms: Number,
    bathrooms: Number,
    area: Number,
    yearBuilt: Number,
    additionalInfo: String
  }
  ```
- **Response**: Created valuation object

#### GET /api/valuations (Admin only - future feature)
- **Description**: Get all valuation requests
- **Response**: Array of valuation objects

### Testimonials API (`/api/testimonials`)

#### GET /api/testimonials
- **Description**: Get all approved testimonials
- **Response**: Array of testimonial objects

### Stats API (`/api/stats`)

#### GET /api/stats
- **Description**: Get website statistics
- **Response**: 
  ```javascript
  {
    totalProperties: Number,
    totalSales: Number,
    totalClients: Number,
    yearsExperience: Number
  }
  ```

## Mock Data to Replace

### From `/app/frontend/src/mock.js`:
1. **properties** array → GET /api/properties
2. **agents** array → GET /api/agents  
3. **testimonials** array → GET /api/testimonials
4. **stats** array → GET /api/stats

## Frontend Integration Points

### Pages to Update:

1. **Home.jsx**
   - Replace `properties` with API call to `/api/properties?featured=true`
   - Replace `stats` with API call to `/api/stats`
   - Replace `testimonials` with API call to `/api/testimonials`

2. **Properties.jsx**
   - Replace `properties` with API call to `/api/properties` with filter params
   - Add real-time filtering with query parameters

3. **PropertyDetail.jsx**
   - Replace property lookup with API call to `/api/properties/:id`
   - Replace agent lookup with API call to `/api/agents/:id`
   - Connect inquiry form to POST `/api/inquiries`

4. **Agents.jsx**
   - Replace `agents` with API call to `/api/agents`

5. **Contact.jsx**
   - Connect contact form to POST `/api/inquiries`

6. **Valuation.jsx**
   - Connect valuation form to POST `/api/valuations`

## Implementation Steps

### Phase 1: Database Models & Seeding
1. Create Mongoose models for all entities
2. Create seed script to populate initial data from mock.js
3. Seed Rohan Darji as the agent

### Phase 2: API Endpoints
1. Implement GET endpoints for properties, agents, testimonials, stats
2. Implement POST endpoints for inquiries and valuations
3. Add error handling and validation

### Phase 3: Frontend Integration
1. Create API service layer in frontend
2. Replace mock data imports with API calls
3. Add loading states and error handling
4. Update forms to submit to backend

### Phase 4: Testing
1. Test all API endpoints with curl/Postman
2. Test frontend integration
3. Verify data flow from frontend to backend

## Environment Variables

Already configured in `/app/backend/.env`:
- MONGO_URL: MongoDB connection string
- DB_NAME: Database name

## Notes
- Admin features (Create/Update/Delete properties) are placeholders for future development
- All POST endpoints will validate input data
- Error responses will follow standard format: `{ error: String, message: String }`
- Success responses will follow format: `{ success: Boolean, data: Object/Array }`
