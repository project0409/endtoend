import React, { useState, useEffect } from 'react';
import { experienceAPI } from '../services/api';
import '../styles/my-experiences.css';

const MyExperiences = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMyExperiences();
  }, []);

  const fetchMyExperiences = async () => {
    setLoading(true);
    try {
      const response = await experienceAPI.getMyExperiences();
      setExperiences(response.data.experiences);
    } catch (err) {
      setError('Failed to fetch experiences');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteExperience = async (id) => {
    try {
      await experienceAPI.deleteExperience(id);
      setExperiences(experiences.filter((exp) => exp._id !== id));
    } catch (err) {
      setError('Failed to delete experience');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="my-experiences">
      <h2>My Shared Experiences</h2>

      {error && <div className="error-message">{error}</div>}

      {experiences.length === 0 ? (
        <p className="no-experiences">No experiences shared yet.</p>
      ) : (
        <div className="experiences-grid">
          {experiences.map((exp) => (
            <div key={exp._id} className="exp-card">
              <div className="exp-header">
                <h3>{exp.jobRole} at {exp.company}</h3>
                <button
                  className="btn-delete"
                  onClick={() => handleDeleteExperience(exp._id)}
                >
                  Delete
                </button>
              </div>

              <p><strong>Interview Type:</strong> {exp.interviewType}</p>
              <p><strong>Round:</strong> {exp.round}</p>
              <p><strong>Result:</strong> {exp.result}</p>
              <p><strong>Rating:</strong> {exp.rating}/5</p>

              {exp.skillsRequired.length > 0 && (
                <div className="skills">
                  <strong>Skills:</strong>
                  <div className="skill-tags">
                    {exp.skillsRequired.map((skill, idx) => (
                      <span key={idx} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                </div>
              )}

              <p><strong>Preparation Tips:</strong> {exp.preparationTips}</p>
              <p><strong>Experience:</strong> {exp.interviewExperience}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyExperiences;
