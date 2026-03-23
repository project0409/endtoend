import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import experienceService from '../services/experienceService';

function ExperienceDetail() {
  const [experience, setExperience] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchExperience();
  }, [id]);

  const fetchExperience = async () => {
    try {
      const response = await experienceService.getExperienceById(id);
      setExperience(response.experience);
    } catch (error) {
      console.error('Error fetching experience:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!experience) return <div>Experience not found</div>;

  return (
    <div className="container">
      <div className="header">
        <h1>Interview Experience Details</h1>
        <button className="btn-secondary" onClick={() => navigate('/')}>Back</button>
      </div>

      <div className="detail-card">
        <div className="detail-header">
          <h2>{experience.company}</h2>
          <p className="role">{experience.role}</p>
        </div>

        <div className="detail-tags">
          <span className={`tag ${experience.difficulty}`}>{experience.difficulty}</span>
          <span className="tag">{experience.interviewType}</span>
          <span className={`tag ${experience.outcome}`}>{experience.outcome}</span>
        </div>

        <div className="detail-section">
          <h3>Interview Date</h3>
          <p>{new Date(experience.interviewDate).toLocaleDateString()}</p>
        </div>

        {experience.skillsRequired && experience.skillsRequired.length > 0 && (
          <div className="detail-section">
            <h3>Skills Required</h3>
            <div className="skills-list">
              {experience.skillsRequired.map((skill, index) => (
                <span key={index} className="skill-tag">{skill}</span>
              ))}
            </div>
          </div>
        )}

        {experience.preparationTips && (
          <div className="detail-section">
            <h3>Preparation Tips</h3>
            <p>{experience.preparationTips}</p>
          </div>
        )}

        {experience.overallExperience && (
          <div className="detail-section">
            <h3>Overall Experience</h3>
            <p>{experience.overallExperience}</p>
          </div>
        )}

        {experience.rating && (
          <div className="detail-section">
            <h3>Rating</h3>
            <p className="rating">{'⭐'.repeat(experience.rating)}</p>
          </div>
        )}

        {experience.userId && (
          <div className="detail-section">
            <h3>Shared By</h3>
            <p>{experience.userId.name}</p>
            {experience.userId.profile && experience.userId.profile.company && (
              <p className="small-text">{experience.userId.profile.position} at {experience.userId.profile.company}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ExperienceDetail;
