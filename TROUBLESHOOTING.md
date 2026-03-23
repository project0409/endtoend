# Troubleshooting Guide

## Common Issues and Solutions

### 1. MongoDB Connection Issues

#### Error: "MongoServerError: connect ECONNREFUSED"

**Cause:** MongoDB is not running or connection string is incorrect

**Solutions:**

**For MongoDB Atlas:**
```bash
1. Go to: https://www.mongodb.com/cloud/atlas
2. Sign in to your account
3. Get your connection string from "Connect" button
4. Ensure IP is whitelisted (0.0.0.0/0 for development)
5. Copy the connection string to backend/.env
```

**For Local MongoDB (Windows):**
```bash
1. Install MongoDB Community Edition
2. Start MongoDB service:
   - Open Services (services.msc)
   - Find "MongoDB Server"
   - Start the service
   - Or run: net start MongoDB
3. Update .env:
   MONGODB_URI=mongodb://localhost:27017/interview-prep
```

**For Local MongoDB (Mac):**
```bash
brew services start mongodb-community
```

---

### 2. Port Already in Use

#### Error: "listen EADDRINUSE: address already in use :::5000"

**Solutions:**

**Windows:**
```bash
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process (replace PID with actual PID)
taskkill /PID <PID> /F

# Or change port in backend/.env
PORT=5001
```

**Mac/Linux:**
```bash
# Find process using port 5000
lsof -i :5000

# Kill the process (replace PID with actual PID)
kill -9 <PID>
```

---

### 3. CORS Error

#### Error: "Access to XMLHttpRequest blocked by CORS policy"

**Cause:** Backend and frontend are not communicating properly

**Solutions:**

1. **Ensure backend is running:**
   ```bash
   cd backend
   npm run dev
   ```
   Check console output shows "Server started on port 5000"

2. **Check API base URL in frontend:**
   ```bash
   # Open: frontend/src/services/api.js
   # Line: const API_BASE_URL = 'http://localhost:5000/api';
   # Make sure port 5000 matches your backend PORT
   ```

3. **Restart both servers:**
   ```bash
   # Terminal 1 - Backend
   cd backend && npm run dev

   # Terminal 2 - Frontend
   cd frontend && npm start
   ```

---

### 4. npm Install Failures

#### Error: "npm ERR! ... peer dependencies"

**Solutions:**

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and lock file
rm -rf node_modules package-lock.json

# Reinstall
npm install

# If still failing, force installation
npm install --force
```

---

### 5. React App Won't Start

#### Error: "Failed to compile" or blank page

**Solutions:**

1. **Clear React cache:**
   ```bash
   cd frontend
   rm -rf node_modules package-lock.json
   npm install
   npm start
   ```

2. **Check for syntax errors:**
   - Open browser console (F12)
   - Check for red error messages
   - Fix the file with error

3. **Ensure backend is running:**
   ```bash
   # API calls will fail if backend is down
   curl http://localhost:5000/api/health
   ```

---

### 6. Authentication Failures

#### Error: "Invalid credentials" or "Token is not valid"

**Solutions:**

1. **Check user exists:**
   - Register a new account if needed
   - Ensure email matches exactly
   - Password is case-sensitive

2. **Clear browser storage:**
   ```javascript
   // Open browser console (F12) and run:
   localStorage.removeItem('token');
   window.location.reload();
   ```

3. **Check JWT_SECRET:**
   - Must be set in backend/.env
   - Should not be empty or 'undefined'

---

### 7. Cannot Create/Share Experience

#### Error: "Failed to share experience" or "Permission denied"

**Solutions:**

1. **Ensure you're logged in as employee:**
   - Register with role: "employee"
   - Share experience is only for employees

2. **Check internet connection:**
   - Ensure backend is running
   - Check CORS is enabled

3. **Validate form data:**
   - All required fields must be filled
   - Check for special characters

---

### 8. Skill Assessment Not Working

#### Error: "Skill already exists" or "Failed to create"

**Solutions:**

1. **New skill hasn't been added yet:**
   - Enter skill name in input
   - Select rating
   - Click "Add Skill" button

2. **Duplicate skill:**
   - Each skill can only be added once per user
   - Delete previous entry if you want to re-add
   - Update instead of creating new

---

### 9. Recommendations Not Generating

#### Error: "Failed to generate recommendation"

**Solutions:**

1. **Add skills first:**
   - Go to "Skill Assessment"
   - Add at least one skill
   - Return to recommendations

2. **Share experiences first (optional):**
   - More experiences = better recommendations
   - Or use default recommendations

3. **Check target company/role:**
   - Must be filled in form
   - Can be any company/role name

---

### 10. Database Empty - No Data Showing

**Issue:** Shared experiences or skills not showing

**Solutions:**

1. **Create test data:**
   - Register as employee and share experience
   - Register as student and add skills
   - Check filters (company/role)

2. **Check database connection:**
   ```bash
   # In backend console, look for:
   # "MongoDB Connected: cluster.mongodb.net"
   ```

3. **Verify correct database:**
   - Check MongoDB database name
   - Ensure data is in correct collection
   - Use MongoDB Atlas console

---

### 11. Frontend Styling Issues

**Issue:** Pages look broken or styles not applying

**Solutions:**

1. **Clear browser cache:**
   - Press Ctrl+Shift+Delete
   - Clear cached images and files
   - Refresh page

2. **Restart frontend:**
   ```bash
   cd frontend
   npm start
   ```

3. **Check CSS imports:**
   - All CSS files should be in `src/styles/`
   - Ensure imports in components are correct

---

### 12. Git Issues

#### Error: "fatal: not a git repository"

**Solutions:**

```bash
# Initialize git in project
git init

# Add remote (replace with your repo URL)
git remote add origin https://github.com/your-username/repo.git

# Add and commit files
git add .
git commit -m "Initial commit"

# Push to GitHub
git push -u origin main
```

---

## Performance Issues

### Slow API Responses

1. **Check MongoDB connection:**
   ```bash
   # Test connection in backend console
   ```

2. **Reduce data queries:**
   - Implement pagination
   - Add filtering
   - Index frequently queried fields

### Slow Frontend

1. **Check network tab:**
   - Open DevTools → Network
   - Identify slow requests
   - Check API response times

2. **Optimize bundle:**
   ```bash
   cd frontend
   npm run build
   # Check build size
   ```

---

## Deployment Issues

### Error on Vercel/Render

1. **Environment variables:**
   - Add all from `.env` to deployment platform
   - Set REACT_APP_API_URL for frontend

2. **Build failures:**
   - Check Node version
   - Ensure all dependencies installed
   - Check for hardcoded paths

### Database connection in production

```env
# Use full connection string
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority

# NOT localhost!
MONGODB_URI=mongodb://localhost:27017/dbname
```

---

## Useful Debugging Commands

```bash
# Test API health
curl http://localhost:5000/api/health

# Test login endpoint
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Check if port is in use
netstat -ano | findstr :5000

# Check running processes
tasklist | findstr node

# MongoDB connection test (if installed locally)
mongo --version
mongod --version
```

---

## Getting Help

### Check Logs

1. **Backend console:**
   - Look for error messages
   - Check MongoDB connection status
   - Verify JWT verification

2. **Frontend console (F12):**
   - Check red error messages
   - Look for API response errors
   - Check network requests

3. **MongoDB Atlas:**
   - Check activity logs
   - View connection events
   - Monitor queries

### Common Error Messages

| Error | Meaning | Solution |
|-------|---------|----------|
| ECONNREFUSED | Connection refused | Start MongoDB or check connection string |
| EADDRINUSE | Port in use | Kill process or change port |
| CORS error | Frontend-backend not communicating | Check API URL and ports |
| Invalid credentials | Login info wrong | Verify email/password, register if needed |
| Token invalid | JWT issue | Login again, clear localStorage |
| MongoError | Database issue | Check MongoDB status and connection |

---

## Quick Fix Checklist

When something stops working:

- [ ] Restart backend: `npm run dev`
- [ ] Restart frontend: `npm start`
- [ ] Check MongoDB is running
- [ ] Clear browser cache (Ctrl+Shift+Delete)
- [ ] Check browser console (F12) for errors
- [ ] Check backend console for errors
- [ ] Verify all ports are correct
- [ ] Verify .env file has correct values
- [ ] Clear localStorage: `localStorage.clear()`
- [ ] Refresh page: Ctrl+R or Cmd+R

---

## Need More Help?

1. Check project documentation files:
   - README.md - Overview
   - SETUP.md - Setup guide
   - API_DOCUMENTATION.md - API reference
   - FEATURES.md - Features list

2. Review code comments in relevant files

3. Check browser and backend console logs

4. Test individual API endpoints with cURL

---

**Happy Debugging! 🐛**
