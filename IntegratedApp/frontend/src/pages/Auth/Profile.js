import React, { useState, useEffect } from 'react';
import authService from '../../services/authService';

function Profile({ user, setUser }) {
  const [formData, setFormData] = useState({ name: '', profile: {} });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({ name: user.name, profile: user.profile || {} });
    }
  }, [user]);

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

  if (!user) return <div>Loading...</div>;

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>My Profile</h1>
      </div>

      <div className="form-container">
        {message && <div className={message.includes('success') ? 'success-message' : 'error-message'}>{message}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" value={user.email} disabled />
          </div>

          <div className="form-group">
            <label>Role</label>
            <input type="text" value={user.role} disabled />
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
