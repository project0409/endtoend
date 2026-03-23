import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import experienceService from '../../services/experienceService';

function ExperienceForm() {
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    interviewDate: '',
    interviewType: 'technical',
    difficulty: 'medium',
    skillsRequired: '',
    preparationTips: '',
    outcome: 'pending',
    overallExperience: '',
    rating: 3
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchExperience = async () => {
        try {
          const response = await experienceService.getExperienceById(id);
          const exp = response.experience;
          setFormData({
            ...exp,
            interviewDate: exp.interviewDate.split('T')[0],
            skillsRequired: exp.skillsRequired.join(', ')
          });
        } catch (error) {
          setMessage('Error loading experience');
        }
      };
      fetchExperience();
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const dataToSubmit = {
        ...formData,
        skillsRequired: formData.skillsRequired.split(',').map(s => s.trim())
      };

      if (id) {
        await experienceService.updateExperience(id, dataToSubmit);
        setMessage('Experience updated successfully!');
      } else {
        await experienceService.createExperience(dataToSubmit);
        setMessage('Experience shared successfully!');
      }

      setTimeout(() => navigate('/my-experiences'), 2000);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to save experience');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>{id ? 'Edit Experience' : 'Share Interview Experience'}</h1>
      </div>

      <div className="form-container">
        {message && <div className={message.includes('success') ? 'success-message' : 'error-message'}>{message}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Company *</label>
            <input type="text" name="company" value={formData.company} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Role *</label>
            <input type="text" name="role" value={formData.role} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Interview Date *</label>
            <input type="date" name="interviewDate" value={formData.interviewDate} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Interview Type *</label>
            <select name="interviewType" value={formData.interviewType} onChange={handleChange} required>
              <option value="technical">Technical</option>
              <option value="hr">HR</option>
              <option value="managerial">Managerial</option>
              <option value="behavioral">Behavioral</option>
              <option value="case-study">Case Study</option>
            </select>
          </div>

          <div className="form-group">
            <label>Difficulty *</label>
            <select name="difficulty" value={formData.difficulty} onChange={handleChange} required>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          <div className="form-group">
            <label>Skills Required (comma-separated)</label>
            <input type="text" name="skillsRequired" value={formData.skillsRequired} onChange={handleChange} placeholder="JavaScript, React, Node.js" />
          </div>

          <div className="form-group">
            <label>Preparation Tips</label>
            <textarea name="preparationTips" value={formData.preparationTips} onChange={handleChange} rows="4"></textarea>
          </div>

          <div className="form-group">
            <label>Overall Experience</label>
            <textarea name="overallExperience" value={formData.overallExperience} onChange={handleChange} rows="4"></textarea>
          </div>

          <div className="form-group">
            <label>Outcome *</label>
            <select name="outcome" value={formData.outcome} onChange={handleChange} required>
              <option value="selected">Selected</option>
              <option value="rejected">Rejected</option>
              <option value="pending">Pending</option>
            </select>
          </div>

          <div className="form-group">
            <label>Rating (1-5)</label>
            <input type="number" name="rating" min="1" max="5" value={formData.rating} onChange={handleChange} />
          </div>

          <button type="submit" className="btn" disabled={loading}>
            {loading ? 'Saving...' : id ? 'Update Experience' : 'Share Experience'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ExperienceForm;
