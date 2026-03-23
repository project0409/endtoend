import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard({ setAuth }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuth(false);
    navigate('/login');
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome, {user.name}!</h1>
        <div className="nav-buttons">
          <button className="btn-secondary" onClick={() => navigate('/profile')}>Profile</button>
          <button className="btn-danger" onClick={handleLogout}>Logout</button>
        </div>
      </div>
      <div className="profile-card">
        <h2>Dashboard</h2>
        <div className="profile-info">
          <p><strong>Role:</strong> {user.role}</p>
          <p><strong>Email:</strong> {user.email}</p>
          {user.role === 'graduate' && user.profile && (
            <>
              <p><strong>University:</strong> {user.profile.university || 'N/A'}</p>
              <p><strong>Degree:</strong> {user.profile.degree || 'N/A'}</p>
              <p><strong>Graduation Year:</strong> {user.profile.graduationYear || 'N/A'}</p>
            </>
          )}
          {user.role === 'employee' && user.profile && (
            <>
              <p><strong>Company:</strong> {user.profile.company || 'N/A'}</p>
              <p><strong>Position:</strong> {user.profile.position || 'N/A'}</p>
              <p><strong>Experience:</strong> {user.profile.experience || 'N/A'} years</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
