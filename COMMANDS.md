# Quick Commands Reference

## Backend Commands

### Install Dependencies
```bash
cd backend
npm install
```

### Start Development Server (with auto-reload)
```bash
npm run dev
```

### Start Production Server
```bash
npm start
```

### Check if Server is Running
```bash
curl http://localhost:5000/api/health
```

## Frontend Commands

### Install Dependencies
```bash
cd frontend
npm install
```

### Start Development Server
```bash
npm start
```

### Build for Production
```bash
npm run build
```

### Run Tests
```bash
npm test
```

## Database Commands

### MongoDB Atlas
- Sign up: https://www.mongodb.com/cloud/atlas
- Create cluster and get connection string
- Add connection string to backend/.env

### Local MongoDB (Windows)
```bash
# Install MongoDB Community Edition
# Start MongoDB service:
mongod

# Or access MongoDB shell:
mongo
```

## Using the Platform

### API Health Check
```bash
curl http://localhost:5000/api/health
```

### Login Endpoint
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'
```

## Troubleshooting Commands

### Check Running Processes
```bash
# Windows
netstat -ano | findstr :5000
netstat -ano | findstr :3000

# Mac/Linux
lsof -i :5000
lsof -i :3000
```

### Kill Process on Port
```bash
# Windows
taskkill /PID <PID> /F

# Mac/Linux
kill -9 <PID>
```

### Clear npm Cache
```bash
npm cache clean --force
```

### Reinstall Dependencies
```bash
rm -rf node_modules package-lock.json
npm install
```

## View Logs

### Backend Console
Check the terminal where you ran `npm run dev` or `npm start`

### Frontend Console
Open browser Developer Tools (F12) → Console tab

### MongoDB Logs
Check MongoDB service logs for connection issues
