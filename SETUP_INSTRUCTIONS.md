# Silfira Realtors - Setup Instructions

This guide will help you set up and run the Silfira Realtors application with MySQL database.

## Prerequisites

1. **Python 3.8+** - [Download](https://www.python.org/downloads/)
2. **Node.js 16+** - [Download](https://nodejs.org/)
3. **MySQL Server 8.0+** - [Download](https://dev.mysql.com/downloads/mysql/)

## MySQL Setup

### Option 1: Local MySQL Installation

1. **Install MySQL Server** from the link above
2. **Start MySQL service**:
   - Windows: MySQL should start automatically, or use MySQL Workbench
   - Mac: `brew services start mysql`
   - Linux: `sudo systemctl start mysql`

3. **Create Database** (using MySQL CLI or MySQL Workbench):
   ```sql
   CREATE DATABASE silfira_realtors;
   ```

4. **Update credentials** in `backend/.env`:
   ```
   MYSQL_URL=mysql+aiomysql://root:YOUR_PASSWORD@localhost:3306/silfira_realtors
   ```

### Option 2: Using XAMPP (Easiest for Windows)

1. **Download and Install XAMPP** - [Download](https://www.apachefriends.org/download.html)
2. **Start XAMPP Control Panel**
3. **Start MySQL** service from the control panel
4. **Create Database**:
   - Click "Admin" button next to MySQL (opens phpMyAdmin)
   - Click "New" in the left sidebar
   - Database name: `silfira_realtors`
   - Click "Create"

5. **Update .env** (default XAMPP credentials):
   ```
   MYSQL_URL=mysql+aiomysql://root:@localhost:3306/silfira_realtors
   ```
   (Note: Default XAMPP has no password, hence `root:@`)

### Option 3: Docker MySQL (For Developers)

```bash
docker run --name mysql-silfira -e MYSQL_ROOT_PASSWORD=password -e MYSQL_DATABASE=silfira_realtors -p 3306:3306 -d mysql:8.0
```

## Backend Setup

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Create virtual environment** (recommended):
   ```bash
   # Windows
   python -m venv venv
   venv\Scripts\activate

   # Mac/Linux
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Verify .env file** exists and has correct MySQL credentials:
   ```bash
   # Check if .env exists
   # If not, copy from .env.example and update credentials
   ```

5. **Run database seed script**:
   ```bash
   python seed_db.py
   ```
   You should see:
   ```
   ✓ Created database tables
   ✓ Seeded agent: Rohan Darji
   ✓ Seeded 6 properties
   ✓ Seeded 3 testimonials
   ✅ Database seeding completed successfully!
   ```

6. **Start backend server**:
   ```bash
   uvicorn server:app --reload --host 0.0.0.0 --port 8000
   ```
   Backend will be available at: http://localhost:8000
   API docs: http://localhost:8000/docs

## Frontend Setup

1. **Open a new terminal** (keep backend running)

2. **Navigate to frontend directory**:
   ```bash
   cd frontend
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Start frontend server**:
   ```bash
   npm start
   ```
   Frontend will be available at: http://localhost:3000

## Verification Steps

1. **Check Backend API**:
   - Visit http://localhost:8000/docs
   - Try the `/api/properties` endpoint
   - Should return 6 properties

2. **Check Frontend**:
   - Visit http://localhost:3000
   - Should see the homepage with featured properties
   - Navigate to different pages to ensure everything works

3. **Check Database**:
   - Use MySQL Workbench or phpMyAdmin
   - Connect to `silfira_realtors` database
   - Verify tables: agents, properties, testimonials, inquiries, valuations

## Common Issues

### Issue: "Can't connect to MySQL server"
- Ensure MySQL service is running
- Check credentials in `.env` file
- Verify database name is correct

### Issue: "No module named 'aiomysql'"
- Run: `pip install -r requirements.txt`

### Issue: "Access denied for user"
- Update password in `.env` file
- For XAMPP, try: `mysql+aiomysql://root:@localhost:3306/silfira_realtors`

### Issue: Frontend can't connect to backend
- Ensure backend is running on port 8000
- Check CORS settings in `backend/server.py`
- Verify `CORS_ORIGINS` in `.env`

## Development Workflow

1. **Make code changes**
   - Backend: FastAPI auto-reloads (if using `--reload`)
   - Frontend: React auto-reloads

2. **Test changes**
   - Backend: http://localhost:8000/docs
   - Frontend: http://localhost:3000

3. **Database changes**
   - Update models in `backend/models.py`
   - Re-run `python seed_db.py` to recreate tables

## Production Deployment

See individual deployment guides:
- Backend: Deploy to services like Heroku, Railway, or AWS
- Frontend: Deploy to Vercel, Netlify, or AWS S3
- Database: Use managed MySQL services like AWS RDS, PlanetScale, or DigitalOcean

## Support

For issues or questions:
1. Check the error messages carefully
2. Verify all prerequisites are installed
3. Ensure all services (MySQL, Backend, Frontend) are running
