# Setup and Installation Guide

## Quick Start

This guide will help you set up and run the Graduate-Employee Interview Preparation Platform locally.

## Prerequisites

Ensure you have the following installed:
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **MongoDB** - Either:
  - Local MongoDB installation, or
  - MongoDB Atlas (free cloud database) - [Create Account](https://www.mongodb.com/cloud/atlas)
- **Git** - [Download](https://git-scm.com/)

## Step 1: Clone or Setup the Project

```bash
# If cloning from GitHub
git clone <repository-url>
cd End\ 2End

# Or navigate to your project folder
cd "c:\Users\K ANJANEYULU\OneDrive\Desktop\End 2End"
```

## Step 2: Backend Setup

### 2.1 Navigate to Backend Folder
```bash
cd backend
```

### 2.2 Install Dependencies
```bash
npm install
```

### 2.3 Create Environment Variables

Create a `.env` file in the backend folder:

```bash
# Windows (use echo or create manually)
# Or simply create a file named .env with the following content:
```

Add these variables to `.env`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/interview-prep?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
PORT=5000
NODE_ENV=development
```

**For MongoDB Atlas:**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a new cluster
4. Get your connection string
5. Replace `username` and `password` in the MONGODB_URI

**For Local MongoDB:**
```env
MONGODB_URI=mongodb://localhost:27017/interview-prep
```

### 2.4 Start Backend Server

```bash
# Development mode with auto-reload
npm run dev

# Or production mode
npm start
```

You should see:
```
MongoDB Connected: ...
Server started on port 5000
```

**Backend is ready at: `http://localhost:5000`**

## Step 3: Frontend Setup

### 3.1 Navigate to Frontend Folder

Open a new terminal and run:
```bash
cd frontend
```

### 3.2 Install Dependencies
```bash
npm install
```

### 3.3 Start Development Server
```bash
npm start
```

The browser will automatically open the application at `http://localhost:3000`

If not, manually open: `http://localhost:3000`

**Frontend is ready at: `http://localhost:3000`**

## Step 4: Create Test Accounts and Data

### 4.1 Register a Student Account

1. Go to `http://localhost:3000/register`
2. Fill in the form:
   - Name: John Student
   - Email: student@example.com
   - Password: password123
   - Role: Student
3. Click Register
4. You'll be redirected to Dashboard

### 4.2 Register an Employee Account

1. Go back to `http://localhost:3000/register`
2. Fill in the form:
   - Name: Jane Employee
   - Email: employee@example.com
   - Password: password123
   - Role: Employee
3. Click Register

### 4.3 Share Interview Experience (as Employee)

1. Log in as employee (employee@example.com)
2. Click "Share Experience"
3. Fill in details:
   - Company: Google
   - Job Role: Software Engineer
   - Interview Type: Technical
   - Add questions, skills, resources
4. Click "Share Experience"

### 4.4 Browse Experiences (as Student)

1. Log in as student (student@example.com)
2. Click "Browse Interview Experiences"
3. Select company: Google
4. Select role: Software Engineer
5. View shared experiences

## Testing the Features

### Feature 1: Authentication
- Register new users ✓
- Login with credentials ✓
- Logout ✓

### Feature 2: Experience Sharing (Employee)
- Share interview experience ✓
- View shared experiences ✓
- Update/delete experiences ✓

### Feature 3: Browse Experiences (Student)
- View experiences by company/role ✓
- Filter by company and job role ✓

### Feature 4: Skill Assessment (Student)
- Add skills with self-ratings ✓
- View skill gap analysis ✓
- Get recommendations ✓

### Feature 5: Recommendations (Student)
- Generate personalized recommendations ✓
- View learning path ✓
- See interview tips ✓

### Feature 6: Preparation Guide
- Get preparation guidance by company/role ✓
- View topics and resources ✓

## API Testing (Optional)

You can test API endpoints using Postman or cURL:

### Example: Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "role": "student"
  }'
```

### Example: Login User
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

## Project Structure Overview

```
End 2End/
├── backend/                          # Node.js/Express backend
│   ├── config/db.js                 # Database connection
│   ├── middleware/auth.js           # Authentication middleware
│   ├── models/                      # MongoDB schemas
│   ├── controllers/                 # Business logic
│   ├── routes/                      # API endpoints
│   ├── server.js                    # Main server file
│   ├── .env                         # Environment variables
│   ├── package.json                 # Dependencies
│   └── .gitignore
│
├── frontend/                         # React frontend
│   ├── public/index.html            # HTML entry
│   ├── src/
│   │   ├── pages/                   # Page components
│   │   ├── components/              # Reusable components
│   │   ├── services/api.js          # API calls
│   │   ├── context/AuthContext.js   # Auth state
│   │   ├── styles/                  # CSS files
│   │   ├── App.js                   # Main component
│   │   └── index.js                 # React entry
│   ├── package.json
│   └── .gitignore
│
├── README.md                         # Project documentation
├── SETUP.md                          # This file
└── .gitignore
```

## Troubleshooting

### MongoDB Connection Error

**Error:** `Error: ECONNREFUSED`

**Solution:**
- Ensure MongoDB is running locally, OR
- Use MongoDB Atlas connection string in .env

### Port Already in Use

**Error:** `listen EADDRINUSE: address already in use :::5000`

**Solution:**
```bash
# Kill the process using port 5000
# Windows: 
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -i :5000
kill -9 <PID>
```

### CORS Error

**Error:** `Access to XMLHttpRequest blocked by CORS policy`

**Solution:**
- Ensure backend is running on port 5000
- API URL is correct in `frontend/src/services/api.js`

### npm Install Fails

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

## Deployment

### Deploy Backend (Render):
1. Push code to GitHub
2. Connect Render to GitHub
3. Configure environment variables
4. Deploy

### Deploy Frontend (Vercel):
1. Push code to GitHub
2. Import project in Vercel
3. Deploy

See README.md for detailed deployment instructions.

## Next Steps

1. ✓ Backend running on port 5000
2. ✓ Frontend running on port 3000
3. ✓ Test all features
4. 📝 Customize styling and add more features
5. 🚀 Deploy to production

## Need Help?

- Check backend logs for API errors
- Check browser console for frontend errors
- Verify environment variables are set correctly
- Ensure both frontend and backend servers are running

## Development Commands

### Backend:
```bash
npm start      # Production mode
npm run dev    # Development mode with auto-reload
```

### Frontend:
```bash
npm start      # Development server
npm run build  # Build for production
npm test       # Run tests
```

Happy Coding! 🚀
