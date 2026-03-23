import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../../services/authService';

function Register({ setAuth, setUser }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'graduate',
    profile: {}
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
    setError('');
    setLoading(true);

    try {
      const response = await authService.register(formData);
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      setAuth(true);
      setUser(response.user);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Register for Interview Prep Platform</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required minLength="6" />
          </div>
          <div className="form-group">
            <label>Role</label>
            <select name="role" value={formData.role} onChange={handleChange} required>
              <option value="graduate">Graduate</option>
              <option value="employee">Employee</option>
            </select>
          </div>
          
          {formData.role === 'graduate' && (
            <div className="role-fields">
              <div className="form-group">
                <label>University</label>
                <input type="text" name="university" onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Degree</label>
                <input type="text" name="degree" onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Graduation Year</label>
                <input type="number" name="graduationYear" onChange={handleChange} />
              </div>
            </div>
          )}

          {formData.role === 'employee' && (
            <div className="role-fields">
              <div className="form-group">
                <label>Company</label>
                <input type="text" name="company" onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Position</label>
                <input type="text" name="position" onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Experience (years)</label>
                <input type="number" name="experience" onChange={handleChange} />
              </div>
            </div>
          )}

          <button type="submit" className="btn" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <div className="auth-link">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
