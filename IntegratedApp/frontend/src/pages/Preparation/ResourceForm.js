import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import resourceService from '../../services/resourceService';

function ResourceForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'technical',
    type: 'article',
    url: '',
    difficulty: 'intermediate',
    skills: '',
    duration: '',
    isPremium: false,
    rating: 0
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const dataToSubmit = {
        ...formData,
        skills: formData.skills.split(',').map(s => s.trim()).filter(s => s)
      };

      await resourceService.createResource(dataToSubmit);
      setMessage('Resource created successfully!');
      setTimeout(() => navigate('/resources'), 2000);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to create resource');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Add Preparation Resource</h1>
        <button className="btn-secondary" onClick={() => navigate('/resources')}>Back</button>
      </div>

      <div className="form-container">
        {message && <div className={message.includes('success') ? 'success-message' : 'error-message'}>{message}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title *</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Description *</label>
            <textarea name="description" value={formData.description} onChange={handleChange} rows="4" required></textarea>
          </div>

          <div className="form-group">
            <label>Category *</label>
            <select name="category" value={formData.category} onChange={handleChange} required>
              <option value="technical">Technical</option>
              <option value="behavioral">Behavioral</option>
              <option value="aptitude">Aptitude</option>
              <option value="hr">HR</option>
              <option value="case-study">Case Study</option>
              <option value="coding">Coding</option>
              <option value="system-design">System Design</option>
            </select>
          </div>

          <div className="form-group">
            <label>Type *</label>
            <select name="type" value={formData.type} onChange={handleChange} required>
              <option value="article">Article</option>
              <option value="video">Video</option>
              <option value="course">Course</option>
              <option value="book">Book</option>
              <option value="practice">Practice</option>
              <option value="tutorial">Tutorial</option>
            </select>
          </div>

          <div className="form-group">
            <label>URL</label>
            <input type="url" name="url" value={formData.url} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Difficulty</label>
            <select name="difficulty" value={formData.difficulty} onChange={handleChange}>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          <div className="form-group">
            <label>Skills (comma-separated)</label>
            <input type="text" name="skills" value={formData.skills} onChange={handleChange} placeholder="JavaScript, React, Node.js" />
          </div>

          <div className="form-group">
            <label>Duration</label>
            <input type="text" name="duration" value={formData.duration} onChange={handleChange} placeholder="2 hours" />
          </div>

          <div className="form-group">
            <label>Rating (0-5)</label>
            <input type="number" name="rating" min="0" max="5" step="0.5" value={formData.rating} onChange={handleChange} />
          </div>

          <div className="form-group checkbox">
            <label>
              <input type="checkbox" name="isPremium" checked={formData.isPremium} onChange={handleChange} />
              Premium Resource
            </label>
          </div>

          <button type="submit" className="btn" disabled={loading}>
            {loading ? 'Creating...' : 'Create Resource'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResourceForm;
