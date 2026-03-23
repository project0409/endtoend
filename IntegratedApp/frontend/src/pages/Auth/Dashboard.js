import React from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard({ user }) {
  const navigate = useNavigate();
  const isGraduate = user?.role === 'graduate';
  const isEmployee = user?.role === 'employee';

  return (
    <div className="page-container">

      {/* Welcome Banner - different color per role */}
      <div className={`dashboard-welcome ${isEmployee ? 'employee-welcome' : 'graduate-welcome'}`}>
        <div className="welcome-icon">{isEmployee ? '💼' : '🎓'}</div>
        <h1>Welcome, {user?.name}!</h1>
        <p className="role-badge">{isEmployee ? 'Employee' : 'Graduate Student'}</p>
        <p className="welcome-subtitle">
          {isEmployee
            ? 'Share your interview experiences and help graduates succeed!'
            : 'Explore real interview experiences and prepare smarter!'}
        </p>
      </div>

      {/* GRADUATE DASHBOARD */}
      {isGraduate && (
        <>
          <div className="section-title">📚 Prepare for Your Dream Job</div>
          <div className="dashboard-grid">

            <div className="dashboard-card graduate-card" onClick={() => navigate('/experiences')}>
              <div className="card-icon">🔍</div>
              <h3>Browse Experiences</h3>
              <p>Read real interview experiences shared by working professionals for your target company and role</p>
              <button className="btn">Browse Now</button>
            </div>

            <div className="dashboard-card graduate-card" onClick={() => navigate('/resources')}>
              <div className="card-icon">📖</div>
              <h3>Study Resources</h3>
              <p>Access curated articles, videos, courses and practice material for interview preparation</p>
              <button className="btn">View Resources</button>
            </div>

            <div className="dashboard-card graduate-card" onClick={() => navigate('/checklists/create')}>
              <div className="card-icon">✅</div>
              <h3>Preparation Checklist</h3>
              <p>Create a personalized checklist for your target company and track your preparation progress</p>
              <button className="btn">Create Checklist</button>
            </div>

            <div className="dashboard-card graduate-card" onClick={() => navigate('/assessments/create')}>
              <div className="card-icon">📊</div>
              <h3>Skill Gap Analysis</h3>
              <p>Identify your skill gaps for your target role and get a personalized learning roadmap</p>
              <button className="btn">Analyze Skills</button>
            </div>

          </div>

          <div className="quick-stats">
            <h2>⚡ Quick Access</h2>
            <div className="stats-grid">
              <div className="stat-card" onClick={() => navigate('/experiences')}>
                <h4>🔍 Search Experiences</h4>
                <p>Find experiences by company, role or difficulty</p>
              </div>
              <div className="stat-card" onClick={() => navigate('/checklists')}>
                <h4>✅ My Checklists</h4>
                <p>Track your preparation progress</p>
              </div>
              <div className="stat-card" onClick={() => navigate('/assessments')}>
                <h4>📊 My Assessments</h4>
                <p>Review your skill gap analyses</p>
              </div>
              <div className="stat-card" onClick={() => navigate('/profile')}>
                <h4>👤 My Profile</h4>
                <p>Update your university and degree info</p>
              </div>
            </div>
          </div>
        </>
      )}

      {/* EMPLOYEE DASHBOARD */}
      {isEmployee && (
        <>
          <div className="section-title">💼 Help Graduates Succeed</div>
          <div className="dashboard-grid">

            <div className="dashboard-card employee-card" onClick={() => navigate('/experiences/create')}>
              <div className="card-icon">✍️</div>
              <h3>Share Experience</h3>
              <p>Share your interview experience to help graduates prepare for their dream companies and roles</p>
              <button className="btn employee-btn">Share Now</button>
            </div>

            <div className="dashboard-card employee-card" onClick={() => navigate('/my-experiences')}>
              <div className="card-icon">📋</div>
              <h3>My Shared Experiences</h3>
              <p>View, edit or delete the interview experiences you have shared with graduates</p>
              <button className="btn employee-btn">View Mine</button>
            </div>

            <div className="dashboard-card employee-card" onClick={() => navigate('/resources/create')}>
              <div className="card-icon">📚</div>
              <h3>Add Resource</h3>
              <p>Contribute preparation resources like articles, videos or courses to help graduates</p>
              <button className="btn employee-btn">Add Resource</button>
            </div>

            <div className="dashboard-card employee-card" onClick={() => navigate('/experiences')}>
              <div className="card-icon">🌐</div>
              <h3>All Experiences</h3>
              <p>Browse all interview experiences shared by professionals across companies and roles</p>
              <button className="btn employee-btn">Browse All</button>
            </div>

          </div>

          <div className="quick-stats">
            <h2>⚡ Quick Access</h2>
            <div className="stats-grid">
              <div className="stat-card" onClick={() => navigate('/experiences/create')}>
                <h4>✍️ Share Experience</h4>
                <p>Help a graduate today by sharing your story</p>
              </div>
              <div className="stat-card" onClick={() => navigate('/my-experiences')}>
                <h4>📋 My Experiences</h4>
                <p>Manage your shared experiences</p>
              </div>
              <div className="stat-card" onClick={() => navigate('/resources')}>
                <h4>📚 Resources</h4>
                <p>Browse all preparation resources</p>
              </div>
              <div className="stat-card" onClick={() => navigate('/profile')}>
                <h4>👤 My Profile</h4>
                <p>Update your company and position info</p>
              </div>
            </div>
          </div>
        </>
      )}

    </div>
  );
}

export default Dashboard;
