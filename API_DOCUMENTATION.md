# API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

---

## Endpoints

### 1. Authentication Module

#### Register User
```
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "student" | "employee"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "6456d1b2e4c2a5f8b1c9d8e7",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "student"
  }
}
```

#### Login User
```
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "6456d1b2e4c2a5f8b1c9d8e7",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "student",
    "company": null,
    "jobRole": null
  }
}
```

#### Get Current User
```
GET /auth/me
Authorization: Bearer <token>

Response:
{
  "_id": "6456d1b2e4c2a5f8b1c9d8e7",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "student",
  "company": null,
  "jobRole": null,
  "skills": []
}
```

#### Update Profile
```
PUT /auth/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "company": "Microsoft",
  "jobRole": "Senior Engineer",
  "yearsOfExperience": 5,
  "skills": ["JavaScript", "React", "Node.js"]
}

Response:
{
  "message": "Profile updated successfully",
  "user": { ... }
}
```

---

### 2. Experience Sharing Module

#### Get All Companies
```
GET /experiences/companies

Response:
["Google", "Amazon", "Microsoft", "Facebook"]
```

#### Get Job Roles for a Company
```
GET /experiences/companies/{company}/roles

Example: GET /experiences/companies/Google/roles

Response:
["Software Engineer", "Senior Engineer", "Tech Lead"]
```

#### Get Experiences by Company and Role
```
GET /experiences?company={company}&jobRole={jobRole}

Example: GET /experiences?company=Google&jobRole=Software+Engineer

Response:
{
  "count": 3,
  "experiences": [
    {
      "_id": "...",
      "company": "Google",
      "jobRole": "Software Engineer",
      "interviewType": "technical",
      "round": 1,
      "questionsAsked": [...],
      "skillsRequired": ["JavaScript", "System Design"],
      "rating": 4,
      "result": "selected"
    }
  ]
}
```

#### Get Single Experience
```
GET /experiences/{id}
Authorization: Bearer <token> (optional)

Response:
{
  "_id": "...",
  "company": "Google",
  "jobRole": "Software Engineer",
  "interviewType": "technical",
  "round": 1,
  "questionsAsked": [
    {
      "question": "Design a URL shortener",
      "topicArea": "System Design",
      "difficulty": "hard"
    }
  ],
  "skillsRequired": ["JavaScript", "System Design"],
  "preparationTips": "Study system design patterns",
  "interviewExperience": "Great experience...",
  "result": "selected",
  "rating": 5,
  "resourcesUsed": ["Educative.io", "LeetCode"]
}
```

#### Share Interview Experience
```
POST /experiences
Authorization: Bearer <token>
Content-Type: application/json

{
  "company": "Google",
  "jobRole": "Software Engineer",
  "interviewType": "technical",
  "round": 1,
  "questionsAsked": [
    {
      "question": "Reverse linked list",
      "topicArea": "Data Structures",
      "difficulty": "medium"
    }
  ],
  "skillsRequired": ["JavaScript", "Algorithms"],
  "preparationTips": "Practice on LeetCode",
  "interviewExperience": "Interview was smooth",
  "result": "selected",
  "rating": 5,
  "resourcesUsed": ["LeetCode", "GeeksforGeeks"]
}

Response:
{
  "message": "Experience shared successfully",
  "experience": { ... }
}
```

#### Update Experience
```
PUT /experiences/{id}
Authorization: Bearer <token>
Content-Type: application/json

{
  "rating": 4,
  "preparationTips": "Updated tips"
}

Response:
{
  "message": "Experience updated successfully",
  "experience": { ... }
}
```

#### Delete Experience
```
DELETE /experiences/{id}
Authorization: Bearer <token>

Response:
{
  "message": "Experience deleted successfully"
}
```

#### Get My Experiences
```
GET /experiences/my/all
Authorization: Bearer <token>

Response:
{
  "count": 2,
  "experiences": [ ... ]
}
```

---

### 3. Preparation Guidance Module

#### Get Preparation Guidance
```
GET /guidance?company={company}&jobRole={jobRole}

Example: GET /guidance?company=Google&jobRole=Software+Engineer

Response:
{
  "_id": "...",
  "company": "Google",
  "jobRole": "Software Engineer",
  "topics": [
    {
      "name": "Data Structures",
      "description": "Master arrays, linked lists, trees",
      "resources": [],
      "difficulty": "beginner"
    }
  ],
  "technicalSkills": [...],
  "softSkills": [...],
  "estimatedPreparationTime": 60
}
```

#### Get All Guidelines
```
GET /guidance/all

Response:
{
  "count": 5,
  "guidelines": [ ... ]
}
```

#### Create Guidance
```
POST /guidance
Authorization: Bearer <token>
Content-Type: application/json

{
  "company": "Amazon",
  "jobRole": "Backend Engineer",
  "topics": [...],
  "technicalSkills": [...],
  "softSkills": [...],
  "estimatedPreparationTime": 45
}
```

#### Update Guidance
```
PUT /guidance/{id}
Authorization: Bearer <token>
Content-Type: application/json

{
  "estimatedPreparationTime": 50
}
```

---

### 4. Skill Assessment Module

#### Create Skill Assessment
```
POST /skills
Authorization: Bearer <token>
Content-Type: application/json

{
  "skill": "JavaScript",
  "selfRating": 4
}

Response:
{
  "message": "Skill assessment created successfully",
  "assessment": {
    "_id": "...",
    "studentId": "...",
    "skill": "JavaScript",
    "selfRating": 4,
    "status": "not-started"
  }
}
```

#### Get My Skill Assessments
```
GET /skills
Authorization: Bearer <token>

Response:
{
  "count": 5,
  "assessments": [
    {
      "_id": "...",
      "skill": "JavaScript",
      "selfRating": 4,
      "status": "not-started"
    }
  ]
}
```

#### Get Skill Gap Analysis
```
GET /skills/gap-analysis
Authorization: Bearer <token>

Response:
{
  "studentId": "...",
  "totalSkillsAssessed": 5,
  "skillGaps": [
    {
      "skill": "System Design",
      "currentLevel": 2,
      "gapStatus": "HIGH_GAP"
    }
  ],
  "recommendations": [
    "Focus on improving System Design"
  ]
}
```

#### Update Skill Assessment
```
PUT /skills/{id}
Authorization: Bearer <token>
Content-Type: application/json

{
  "selfRating": 5,
  "status": "in-progress"
}
```

#### Delete Skill Assessment
```
DELETE /skills/{id}
Authorization: Bearer <token>

Response:
{
  "message": "Assessment deleted successfully"
}
```

---

### 5. Recommendation Module

#### Generate Recommendation
```
POST /recommendations
Authorization: Bearer <token>
Content-Type: application/json

{
  "targetCompany": "Google",
  "targetRole": "Software Engineer"
}

Response:
{
  "message": "Recommendation generated successfully",
  "recommendation": {
    "_id": "...",
    "studentId": "...",
    "targetCompany": "Google",
    "targetRole": "Software Engineer",
    "skillGaps": [...],
    "recommendedLearningPath": [...],
    "interviewTips": [...],
    "estimatedPreparationDays": 30
  }
}
```

#### Get My Recommendations
```
GET /recommendations
Authorization: Bearer <token>

Response:
{
  "count": 2,
  "recommendations": [ ... ]
}
```

#### Get Single Recommendation
```
GET /recommendations/{id}
Authorization: Bearer <token>

Response:
{
  "_id": "...",
  "targetCompany": "Google",
  "targetRole": "Software Engineer",
  "skillGaps": [
    {
      "skill": "System Design",
      "currentLevel": 2,
      "targetLevel": 4
    }
  ],
  "recommendedLearningPath": [
    {
      "step": 1,
      "topic": "System Design",
      "duration": "1-2 weeks",
      "resources": ["Educative.io", "YouTube"],
      "priority": "high"
    }
  ],
  "estimatedPreparationDays": 30
}
```

#### Delete Recommendation
```
DELETE /recommendations/{id}
Authorization: Bearer <token>

Response:
{
  "message": "Recommendation deleted successfully"
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "Please provide all required fields"
}
```

### 401 Unauthorized
```json
{
  "error": "Token is not valid"
}
```

### 403 Forbidden
```json
{
  "error": "Not authorized to perform this action"
}
```

### 404 Not Found
```json
{
  "error": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Something went wrong!"
}
```

---

## Example Requests using cURL

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "student"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Share Experience
```bash
curl -X POST http://localhost:5000/api/experiences \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "company": "Google",
    "jobRole": "Software Engineer",
    "interviewType": "technical",
    "round": 1,
    "questionsAsked": [],
    "skillsRequired": ["JavaScript"],
    "preparationTips": "Study well",
    "interviewExperience": "Great",
    "result": "selected",
    "rating": 5,
    "resourcesUsed": ["LeetCode"]
  }'
```

### Create Skill Assessment
```bash
curl -X POST http://localhost:5000/api/skills \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "skill": "JavaScript",
    "selfRating": 4
  }'
```

### Generate Recommendation
```bash
curl -X POST http://localhost:5000/api/recommendations \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "targetCompany": "Google",
    "targetRole": "Software Engineer"
  }'
```
