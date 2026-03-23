import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

function Profile({ setAuth }) {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({ name: '', profile: {} });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setFormData({ name: parsedUser.name, profile: parsedUser.profile || {} });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (['university', 'degree', 'graduationYear', 'company', 'position', 'experience'].includes(name)) {
      setFormData({
        ...formData,
        profile: { ...formData.profile, [name]: value }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await authService.updateProfile(formData);
      localStorage.setItem('user', JSON.stringify(response.user));
      setUser(response.user);
      setMessage('Profile updated successfully!');
    } catch (err) {
      setMessage('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

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
        <h1>Profile</h1>
        <div className="nav-buttons">
          <button className="btn-secondary" onClick={() => navigate('/dashboard')}>Dashboard</button>
          <button className="btn-danger" onClick={handleLogout}>Logout</button>
        </div>
      </div>
      <div className="profile-card">
        <h2>Update Profile</h2>
        {message && <div className={message.includes('success') ? 'success-message' : 'error-message'}>{message}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>

          {user.role === 'graduate' && (
            <>
              <div className="form-group">
                <label>University</label>
                <input type="text" name="university" value={formData.profile.university || ''} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Degree</label>
                <input type="text" name="degree" value={formData.profile.degree || ''} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Graduation Year</label>
                <input type="number" name="graduationYear" value={formData.profile.graduationYear || ''} onChange={handleChange} />
              </div>
            </>
          )}

          {user.role === 'employee' && (
            <>
              <div className="form-group">
                <label>Company</label>
                <input type="text" name="company" value={formData.profile.company || ''} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Position</label>
                <input type="text" name="position" value={formData.profile.position || ''} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Experience (years)</label>
                <input type="number" name="experience" value={formData.profile.experience || ''} onChange={handleChange} />
              </div>
            </>
          )}

          <button type="submit" className="btn" disabled={loading}>
            {loading ? 'Updating...' : 'Update Profile'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Profile;
