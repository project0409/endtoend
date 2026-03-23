import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ user, onLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const isEmployee = user?.role === 'employee';
  const isGraduate = user?.role === 'graduate';

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/dashboard" className="navbar-brand">
          🎓 Interview Prep Platform
        </Link>

        <button className="navbar-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          ☰
        </button>

        <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>

          <Link to="/dashboard" className="nav-link">Dashboard</Link>

          {/* Experiences - both roles see this but with different options */}
          <div className="nav-dropdown">
            <span className="nav-link">Experiences ▾</span>
            <div className="dropdown-content">
              {/* Graduate: browse experiences shared by employees */}
              {isGraduate && (
                <>
                  <Link to="/experiences">🔍 Browse Experiences</Link>
                </>
              )}
              {/* Employee: share and manage their own experiences */}
              {isEmployee && (
                <>
                  <Link to="/experiences/create">✍️ Share Experience</Link>
                  <Link to="/my-experiences">📋 My Shared Experiences</Link>
                  <Link to="/experiences">🌐 Browse All</Link>
                </>
              )}
            </div>
          </div>

          {/* Preparation - both roles */}
          <div className="nav-dropdown">
            <span className="nav-link">Preparation ▾</span>
            <div className="dropdown-content">
              <Link to="/resources">📖 Resources</Link>
              {isEmployee && <Link to="/resources/create">➕ Add Resource</Link>}
              {isGraduate && (
                <>
                  <Link to="/checklists">✅ My Checklists</Link>
                  <Link to="/checklists/create">➕ Create Checklist</Link>
                </>
              )}
            </div>
          </div>

          {/* Skill Gap - only for graduates */}
          {isGraduate && (
            <div className="nav-dropdown">
              <span className="nav-link">Skill Analysis ▾</span>
              <div className="dropdown-content">
                <Link to="/assessments">📊 My Assessments</Link>
                <Link to="/assessments/create">➕ New Assessment</Link>
              </div>
            </div>
          )}

          {/* User Menu */}
          <div className="nav-dropdown">
            <span className="nav-link">
              {isEmployee ? '💼' : '🎓'} {user?.name} ▾
            </span>
            <div className="dropdown-content">
              <Link to="/profile">👤 Profile</Link>
              <button onClick={handleLogout} className="logout-btn">🚪 Logout</button>
            </div>
          </div>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;
