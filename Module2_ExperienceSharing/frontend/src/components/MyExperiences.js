import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import experienceService from '../services/experienceService';

function MyExperiences() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMyExperiences();
  }, []);

  const fetchMyExperiences = async () => {
    try {
      const response = await experienceService.getUserExperiences();
      setExperiences(response.experiences);
    } catch (error) {
      console.error('Error fetching experiences:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this experience?')) {
      try {
        await experienceService.deleteExperience(id);
        setExperiences(experiences.filter(exp => exp._id !== id));
      } catch (error) {
        alert('Failed to delete experience');
      }
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1>My Experiences</h1>
        <div className="nav-buttons">
          <button className="btn" onClick={() => navigate('/create')}>Add New</button>
          <button className="btn-secondary" onClick={() => navigate('/')}>Back</button>
        </div>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : experiences.length === 0 ? (
        <div className="empty-state">
          <p>You haven't shared any experiences yet.</p>
          <button className="btn" onClick={() => navigate('/create')}>Share Your First Experience</button>
        </div>
      ) : (
        <div className="experience-grid">
          {experiences.map((exp) => (
            <div key={exp._id} className="experience-card">
              <h3>{exp.company}</h3>
              <p className="role">{exp.role}</p>
              <div className="tags">
                <span className={`tag ${exp.difficulty}`}>{exp.difficulty}</span>
                <span className="tag">{exp.interviewType}</span>
                <span className={`tag ${exp.outcome}`}>{exp.outcome}</span>
              </div>
              <p className="date">{new Date(exp.interviewDate).toLocaleDateString()}</p>
              <div className="card-actions">
                <button className="btn-small" onClick={() => navigate(`/experience/${exp._id}`)}>View</button>
                <button className="btn-small" onClick={() => navigate(`/edit/${exp._id}`)}>Edit</button>
                <button className="btn-small btn-danger" onClick={() => handleDelete(exp._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyExperiences;
