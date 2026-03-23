# Graduate-Employee Interview Preparation Platform

A comprehensive end-to-end interview preparation platform that connects graduate students with working professionals to share real interview experiences and provide personalized learning paths.

## Project Overview

This platform bridges the gap between graduate students and experienced professionals by:
- Allowing professionals to share structured interview experiences
- Enabling students to browse company and role-specific interview insights
- Providing skill gap analysis based on student assessments
- Generating personalized preparation recommendations
- Offering structured preparation checklists

## Features

### User Authentication Module
- Graduate student and employee registration
- JWT-based authentication
- Secure login/logout functionality
- Profile management

### Experience Sharing Module
- Employees can share detailed interview experiences
- Structured format with company, role, interview type, and round information
- Questions asked, skills required, and resources used
- Interview tips and preparation advice
- Result tracking (selected/rejected/hold)

### Preparation Guidance Module
- Role-based preparation checklists
- Technical and soft skills requirements
- Topic-wise resources and learning materials
- Difficulty levels and time estimates

### Skill Gap Analysis Module
- Student self-assessment of skills
- Gap analysis based on required skills for roles
- Identification of high-gap areas
- Personalized recommendations for improvement

### Recommendation Module
- Personalized learning path generation
- Skill gap mapping with target levels
- Step-by-step preparation roadmap
- Interview tips and strategies
- Related experience suggestions
- Estimated preparation timeline

## Tech Stack

### Backend
- **Framework**: Node.js with Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: express-validator
- **Security**: bcryptjs for password hashing

### Frontend
- **Framework**: React.js
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **State Management**: React Context API
- **Styling**: Custom CSS

### Deployment
- Cloud platforms: AWS, Vercel, or Render
- Version Control: Git/GitHub

## Project Structure

```
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── middleware/
│   │   └── auth.js              # JWT authentication
│   ├── models/
│   │   ├── User.js             # User model
│   │   ├── Experience.js        # Interview experience model
│   │   ├── PreparationChecklist.js # Preparation guidance model
│   │   ├── SkillAssessment.js   # Skill assessment model
│   │   └── Recommendation.js    # Recommendation model
│   ├── controllers/
│   │   ├── authController.js    # Auth logic
│   │   ├── experienceController.js # Experience logic
│   │   ├── guidanceController.js # Guidance logic
│   │   ├── skillController.js   # Skill logic
│   │   └── recommendationController.js # Recommendation logic
│   ├── routes/
│   │   ├── authRoutes.js        # Auth endpoints
│   │   ├── experienceRoutes.js  # Experience endpoints
│   │   ├── guidanceRoutes.js    # Guidance endpoints
│   │   ├── skillRoutes.js       # Skill endpoints
│   │   └── recommendationRoutes.js # Recommendation endpoints
│   ├── server.js                # Main server file
│   ├── .env                     # Environment variables
│   └── package.json

├── frontend/
│   ├── public/
│   │   └── index.html           # HTML entry point
│   ├── src/
│   │   ├── components/
│   │   │   └── ProtectedRoute.js # Route protection
│   │   ├── context/
│   │   │   └── AuthContext.js   # Auth context
│   │   ├── pages/
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Dashboard.js
│   │   │   ├── BrowseExperiences.js
│   │   │   ├── ShareExperience.js
│   │   │   ├── SkillAssessment.js
│   │   │   ├── Recommendations.js
│   │   │   ├── PreparationGuide.js
│   │   │   └── MyExperiences.js
│   │   ├── services/
│   │   │   └── api.js           # API service
│   │   ├── styles/
│   │   │   ├── global.css
│   │   │   ├── auth.css
│   │   │   ├── dashboard.css
│   │   │   ├── browse.css
│   │   │   ├── share-experience.css
│   │   │   ├── skill-assessment.css
│   │   │   ├── recommendations.css
│   │   │   ├── preparation-guide.css
│   │   │   └── my-experiences.css
│   │   ├── App.js               # Main App component
│   │   └── index.js             # Entry point
│   ├── package.json
│   └── .gitignore
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (or MongoDB Atlas account)

### Backend Setup

1. Navigate to backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file with your configuration:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/interview-prep?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key_here_use_strong_key
PORT=5000
NODE_ENV=development
```

4. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update user profile

### Experience Sharing
- `GET /api/experiences/companies` - Get all companies
- `GET /api/experiences/companies/:company/roles` - Get roles for a company
- `GET /api/experiences` - Get experiences (with query params: company, jobRole)
- `GET /api/experiences/:id` - Get single experience
- `POST /api/experiences` - Share new experience
- `GET /api/experiences/my/all` - Get my shared experiences
- `PUT /api/experiences/:id` - Update experience
- `DELETE /api/experiences/:id` - Delete experience

### Preparation Guidance
- `GET /api/guidance` - Get guidance (with query params: company, jobRole)
- `GET /api/guidance/all` - Get all guidelines
- `POST /api/guidance` - Create new guidance
- `PUT /api/guidance/:id` - Update guidance

### Skill Assessment
- `POST /api/skills` - Create skill assessment
- `GET /api/skills` - Get my skill assessments
- `GET /api/skills/gap-analysis` - Get skill gap analysis
- `PUT /api/skills/:id` - Update assessment
- `DELETE /api/skills/:id` - Delete assessment

### Recommendations
- `POST /api/recommendations` - Generate recommendation
- `GET /api/recommendations` - Get my recommendations
- `GET /api/recommendations/:id` - Get single recommendation
- `DELETE /api/recommendations/:id` - Delete recommendation

## Usage

### For Graduate Students
1. Register as a student
2. Browse interview experiences by company and role
3. Take skill assessments to identify gaps
4. View preparation guides for target companies
5. Get personalized recommendations for your target roles
6. Follow the structured learning path to prepare

### For Working Professionals
1. Register as an employee
2. Share detailed interview experiences
3. Help future candidates by providing insights
4. Update or delete your experiences as needed

## Database Schema

### User
- name, email, password, role
- company, jobRole, yearsOfExperience
- skills, bio, profileImage
- timestamps

### Experience
- employeeId, company, jobRole
- interviewType, round
- questionsAsked, skillsRequired
- preparationTips, interviewExperience
- result, rating, resourcesUsed
- timestamps

### SkillAssessment
- studentId, skill, selfRating
- assessmentScore, feedback
- resourcesRecommended, status
- timestamps

### Recommendation
- studentId, targetCompany, targetRole
- skillGaps, recommendedLearningPath
- interviewTips, relatedExperiences
- estimatedPreparationDays
- timestamps

### PreparationChecklist
- company, jobRole
- topics, technicalSkills, softSkills
- estimatedPreparationTime
- timestamps

## Error Handling

All API endpoints return appropriate HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Server Error

## Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- Protected routes
- CORS enabled
- Environment variables for sensitive data
- Input validation

## Future Enhancements

- Video interview testimonials
- Video interview recording and analysis
- Real-time mock interviews
- AI-powered skill assessment
- Interview success rate analytics
- Discussion forums
- Email notifications
- Mobile app
- Payment integration for premium features

## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.

## Support

For issues or questions, please contact the development team or create an issue on GitHub.

## Deployment

### Backend Deployment (Render/Heroku/AWS)

1. Create an account on the deployment platform
2. Connect your GitHub repository
3. Set environment variables
4. Deploy the backend service

### Frontend Deployment (Vercel/Netlify)

1. Create an account on Vercel or Netlify
2. Connect your GitHub repository
3. Configure build settings
4. Deploy the frontend

## API Configuration for Production

Update the API base URL in `frontend/src/services/api.js` to point to your production backend URL.
