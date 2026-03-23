import React, { useState, useEffect } from 'react';
import { skillAPI, recommendationAPI } from '../services/api';
import '../styles/skill-assessment.css';

const SkillAssessment = () => {
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState('');
  const [rating, setRating] = useState(3);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [skillGaps, setSkillGaps] = useState(null);

  useEffect(() => {
    fetchMySkills();
    fetchSkillGaps();
  }, []);

  const fetchMySkills = async () => {
    try {
      const response = await skillAPI.getMyAssessments();
      setSkills(response.data.assessments);
    } catch (err) {
      setError('Failed to fetch skills');
    }
  };

  const fetchSkillGaps = async () => {
    try {
      const response = await skillAPI.getSkillGapAnalysis();
      setSkillGaps(response.data);
    } catch (err) {
      console.error('Failed to fetch skill gaps');
    }
  };

  const handleAddSkill = async (e) => {
    e.preventDefault();
    if (!newSkill) return;

    setLoading(true);
    try {
      await skillAPI.createAssessment({
        skill: newSkill,
        selfRating: rating,
      });
      setMessage('Skill added successfully');
      setNewSkill('');
      setRating(3);
      await fetchMySkills();
      await fetchSkillGaps();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add skill');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSkill = async (id) => {
    try {
      await skillAPI.deleteAssessment(id);
      await fetchMySkills();
      await fetchSkillGaps();
    } catch (err) {
      setError('Failed to delete skill');
    }
  };

  return (
    <div className="skill-assessment">
      <h2>Skill Assessment</h2>

      {error && <div className="error-message">{error}</div>}
      {message && <div className="success-message">{message}</div>}

      <div className="add-skill-form">
        <h3>Add Your Skills</h3>
        <form onSubmit={handleAddSkill}>
          <div className="form-group">
            <label>Skill Name</label>
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="e.g., JavaScript, React, System Design"
            />
          </div>
          <div className="form-group">
            <label>Self-Rating (1-5)</label>
            <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
              <option value="1">Beginner (1)</option>
              <option value="2">Elementary (2)</option>
              <option value="3">Intermediate (3)</option>
              <option value="4">Advanced (4)</option>
              <option value="5">Expert (5)</option>
            </select>
          </div>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Adding...' : 'Add Skill'}
          </button>
        </form>
      </div>

      <div className="skills-list">
        <h3>Your Skills</h3>
        {skills.length === 0 ? (
          <p>No skills added yet.</p>
        ) : (
          <div className="skills-grid">
            {skills.map((skill) => (
              <div key={skill._id} className="skill-card">
                <h4>{skill.skill}</h4>
                <p>Self-Rating: {skill.selfRating}/5</p>
                <p>Status: {skill.status}</p>
                <button
                  onClick={() => handleDeleteSkill(skill._id)}
                  className="btn-delete"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {skillGaps && (
        <div className="skill-gaps-analysis">
          <h3>Skill Gap Analysis</h3>
          <p>Total Skills Assessed: {skillGaps.totalSkillsAssessed}</p>
          <div className="gaps-list">
            {skillGaps.skillGaps.map((gap, idx) => (
              <div key={idx} className="gap-item">
                <span className="skill">{gap.skill}</span>
                <span className={`gap-status ${gap.gapStatus.toLowerCase()}`}>
                  {gap.gapStatus}
                </span>
              </div>
            ))}
          </div>
          {skillGaps.recommendations.length > 0 && (
            <div className="recommendations">
              <h4>Recommendations:</h4>
              <ul>
                {skillGaps.recommendations.map((rec, idx) => (
                  <li key={idx}>{rec}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SkillAssessment;
