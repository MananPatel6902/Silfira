# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Silfira Realtors is a full-stack real estate website with a Python FastAPI backend and React frontend. The application manages property listings, agents, inquiries, valuations, and testimonials.

## Architecture

### Backend (Python/FastAPI)
- **Framework**: FastAPI with async/await pattern
- **Database**: MongoDB with Motor (async driver)
- **Structure**:
  - `server.py`: Main FastAPI app with CORS middleware and `/api` prefix routing
  - `models.py`: Pydantic models for validation (Property, Agent, Inquiry, Valuation, Testimonial, Stats)
  - `routes.py`: API endpoint implementations
  - `database.py`: MongoDB collections and helper functions (generate_id, add_timestamps)
  - `seed_db.py`: Database seeding script using data from `seed_data.py`

### Frontend (React)
- **Framework**: React with React Router
- **UI Library**: shadcn/ui components (extensive component library in `src/components/ui/`)
- **Routing**: BrowserRouter with routes defined in `App.js`
- **Pages**: Home, Properties, PropertyDetail, About, Agents, Contact, Valuation
- **Mock Data**: Currently uses `src/mock.js` (to be replaced with API calls per `contracts.md`)

### Database Models
All models use UUID-based `_id` fields and include `created_at`/`updated_at` timestamps:
- **Property**: title, type (enum), status (enum), price, location, bedrooms, bathrooms, area, images, features, agent reference
- **Agent**: name, title, email, phone, bio, specialties, listings count
- **Inquiry**: property_id (optional), contact info, message, type (property/general), status
- **Valuation**: property details, contact info, status (pending/completed)
- **Testimonial**: name, role, content, rating, approved flag

## Development Commands

### Backend
```bash
cd backend

# Install dependencies
pip install -r requirements.txt

# Run development server
uvicorn server:app --reload --host 0.0.0.0 --port 8000

# Seed database (requires .env with MONGO_URL and DB_NAME)
python seed_db.py

# Code formatting and linting
black .
isort .
flake8
mypy .
```

### Frontend
```bash
cd frontend

# Install dependencies
npm install

# Run development server
npm start

# Build for production
npm run build

# Run tests
npm test
```

## Environment Configuration

### Backend `.env` (required)
```
MONGO_URL=mongodb://...
DB_NAME=silfira_realtors
CORS_ORIGINS=http://localhost:3000,http://localhost:5173
```

### Frontend `.env` (optional)
Configure API base URL if needed.

## API Endpoints

All endpoints are prefixed with `/api`:

- `GET /api/properties` - List properties (supports filters: type, status, minPrice, maxPrice, location, featured)
- `GET /api/properties/:id` - Get single property
- `POST /api/properties` - Create property (admin)
- `GET /api/agents` - List all agents
- `GET /api/agents/:id` - Get single agent
- `POST /api/inquiries` - Submit inquiry/contact form
- `GET /api/inquiries` - List inquiries (admin)
- `POST /api/valuations` - Submit valuation request
- `GET /api/valuations` - List valuations (admin)
- `GET /api/testimonials` - List approved testimonials
- `GET /api/stats` - Get website statistics

See `contracts.md` for detailed API specifications and frontend integration plan.

## Testing Protocol

This project uses a specialized testing workflow documented in `test_result.md`. The file contains:
- A YAML-based testing data structure tracking backend/frontend tasks
- Task status tracking (implemented, working, stuck_count, priority)
- Agent communication protocol between main and testing agents
- Test plan with current focus and stuck tasks

**Important**: When making changes, update `test_result.md` before requesting testing from a testing agent. Include status history and set `needs_retesting: true` for modified tasks.

## Key Integration Points

The frontend currently uses mock data from `src/mock.js`. The `contracts.md` file outlines the complete migration plan to replace mock data with API calls in:
- Home.jsx (featured properties, stats, testimonials)
- Properties.jsx (property list with filters)
- PropertyDetail.jsx (property details, agent info, inquiry form)
- Agents.jsx (agent list)
- Contact.jsx (contact form submission)
- Valuation.jsx (valuation form submission)

## Technical Notes

- Backend uses Motor for async MongoDB operations
- All API routes are async/await
- Frontend uses shadcn/ui component library with Tailwind CSS
- IDs are UUID v4 strings, not MongoDB ObjectIds
- Stats endpoint returns mostly static values (only total_properties is dynamic)
- CORS is configured via environment variable
