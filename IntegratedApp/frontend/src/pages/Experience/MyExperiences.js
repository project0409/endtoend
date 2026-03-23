import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import experienceService from '../../services/experienceService';

function MyExperiences() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyExperiences = async () => {
      try {
        const response = await experienceService.getUserExperiences();
        setExperiences(response.experiences || []);
      } catch (err) {
        setError('Failed to load your experiences. Make sure you are logged in.');
      } finally {
        setLoading(false);
      }
    };
    fetchMyExperiences();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this experience?')) {
      try {
        await experienceService.deleteExperience(id);
        setExperiences(experiences.filter(exp => exp._id !== id));
      } catch (err) {
        alert('Failed to delete experience.');
      }
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>My Shared Experiences</h1>
        <div className="header-actions">
          <button className="btn" onClick={() => navigate('/experiences/create')}>+ Share New</button>
          <button className="btn-secondary" onClick={() => navigate('/experiences')}>Browse All</button>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading your experiences...</div>
      ) : experiences.length === 0 ? (
        <div className="empty-state">
          <p>You haven't shared any experiences yet.</p>
          <button className="btn" onClick={() => navigate('/experiences/create')}>
            Share Your First Experience
          </button>
        </div>
      ) : (
        <div className="card-grid">
          {experiences.map((exp) => (
            <div key={exp._id} className="card">
              <h3>{exp.company}</h3>
              <p className="subtitle">{exp.role}</p>
              <div className="tags">
                <span className={`tag ${exp.difficulty}`}>{exp.difficulty}</span>
                <span className="tag">{exp.interviewType}</span>
                <span className={`tag ${exp.outcome}`}>{exp.outcome}</span>
              </div>
              <p className="date">{new Date(exp.interviewDate).toLocaleDateString()}</p>
              <div className="card-actions">
                <button className="btn-small" onClick={() => navigate(`/experiences/${exp._id}`)}>View</button>
                <button className="btn-small" onClick={() => navigate(`/experiences/edit/${exp._id}`)}>Edit</button>
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
