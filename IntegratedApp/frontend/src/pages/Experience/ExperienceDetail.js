import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import experienceService from '../../services/experienceService';

function ExperienceDetail() {
  const [experience, setExperience] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const response = await experienceService.getExperienceById(id);
        setExperience(response.experience);
      } catch (err) {
        setError('Failed to load experience details.');
      } finally {
        setLoading(false);
      }
    };
    fetchExperience();
  }, [id]);

  if (loading) return <div className="loading">Loading experience details...</div>;

  if (error) return (
    <div className="page-container">
      <div className="error-message">{error}</div>
      <button className="btn-secondary" onClick={() => navigate('/experiences')}>Back to Experiences</button>
    </div>
  );

  if (!experience) return (
    <div className="page-container">
      <div className="empty-state">
        <p>Experience not found.</p>
        <button className="btn" onClick={() => navigate('/experiences')}>Back to Experiences</button>
      </div>
    </div>
  );

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Interview Experience Details</h1>
        <button className="btn-secondary" onClick={() => navigate('/experiences')}>
          ← Back to Experiences
        </button>
      </div>

      <div className="detail-card">

        {/* Company & Role */}
        <div className="detail-header">
          <h2>{experience.company}</h2>
          <p className="subtitle">{experience.role}</p>
        </div>

        {/* Tags */}
        <div className="tags">
          <span className={`tag ${experience.difficulty}`}>{experience.difficulty}</span>
          <span className="tag">{experience.interviewType}</span>
          <span className={`tag ${experience.outcome}`}>{experience.outcome}</span>
        </div>

        {/* Interview Date */}
        <div className="detail-section">
          <h3>📅 Interview Date</h3>
          <p>{new Date(experience.interviewDate).toLocaleDateString('en-IN', {
            year: 'numeric', month: 'long', day: 'numeric'
          })}</p>
        </div>

        {/* Skills Required */}
        {experience.skillsRequired && experience.skillsRequired.length > 0 && (
          <div className="detail-section">
            <h3>🛠 Skills Required</h3>
            <div className="skills-list">
              {experience.skillsRequired.map((skill, index) => (
                <span key={index} className="skill-tag">{skill}</span>
              ))}
            </div>
          </div>
        )}

        {/* Preparation Tips */}
        {experience.preparationTips && (
          <div className="detail-section">
            <h3>💡 Preparation Tips</h3>
            <p>{experience.preparationTips}</p>
          </div>
        )}

        {/* Overall Experience */}
        {experience.overallExperience && (
          <div className="detail-section">
            <h3>📝 Overall Experience</h3>
            <p>{experience.overallExperience}</p>
          </div>
        )}

        {/* Rating */}
        {experience.rating && (
          <div className="detail-section">
            <h3>⭐ Rating</h3>
            <p className="rating">{'⭐'.repeat(experience.rating)} ({experience.rating}/5)</p>
          </div>
        )}

        {/* Shared By */}
        {experience.userId && (
          <div className="detail-section">
            <h3>👤 Shared By</h3>
            <p><strong>{experience.userId.name}</strong></p>
            {experience.userId.profile && experience.userId.profile.company && (
              <p className="small-text">
                {experience.userId.profile.position} at {experience.userId.profile.company}
              </p>
            )}
          </div>
        )}

      </div>
    </div>
  );
}

export default ExperienceDetail;
