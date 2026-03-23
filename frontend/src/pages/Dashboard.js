import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/dashboard.css';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="dashboard">
      <nav className="navbar">
        <div className="nav-container">
          <h1>Interview Prep Platform</h1>
          <div className="nav-links">
            {user?.role === 'student' && (
              <>
                <a href="/browse-experiences">Browse Experiences</a>
                <a href="/skill-assessment">Skill Assessment</a>
                <a href="/recommendations">My Recommendations</a>
                <a href="/preparation-guide">Preparation Guide</a>
              </>
            )}
            {user?.role === 'employee' && (
              <>
                <a href="/share-experience">Share Experience</a>
                <a href="/my-experiences">My Experiences</a>
              </>
            )}
            <button onClick={handleLogout} className="btn-logout">Logout</button>
          </div>
        </div>
      </nav>

      <div className="dashboard-content">
        <div className="welcome-section">
          <h2>Welcome, {user?.name}!</h2>
          <p>Role: {user?.role === 'student' ? 'Graduate Student' : 'Working Professional'}</p>
        </div>

        <div className="dashboard-grid">
          {user?.role === 'student' && (
            <>
              <div className="card">
                <h3>Browse Interview Experiences</h3>
                <p>Learn from experienced professionals' real interview stories</p>
                <a href="/browse-experiences" className="btn-secondary">Explore</a>
              </div>
              <div className="card">
                <h3>Skill Assessment</h3>
                <p>Evaluate your skills and identify gaps</p>
                <a href="/skill-assessment" className="btn-secondary">Assess</a>
              </div>
              <div className="card">
                <h3>Get Personalized Recommendations</h3>
                <p>Receive tailored learning paths for your target role</p>
                <a href="/recommendations" className="btn-secondary">View</a>
              </div>
              <div className="card">
                <h3>Preparation Guide</h3>
                <p>Access structured preparation checklists</p>
                <a href="/preparation-guide" className="btn-secondary">Learn</a>
              </div>
            </>
          )}

          {user?.role === 'employee' && (
            <>
              <div className="card">
                <h3>Share Your Interview Experience</h3>
                <p>Help students by sharing your real interview journey</p>
                <a href="/share-experience" className="btn-secondary">Share</a>
              </div>
              <div className="card">
                <h3>My Shared Experiences</h3>
                <p>View and manage your shared experiences</p>
                <a href="/my-experiences" className="btn-secondary">View</a>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
