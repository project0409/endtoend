import React, { useState, useEffect } from 'react';
import { recommendationAPI } from '../services/api';
import '../styles/recommendations.css';

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [selectedRec, setSelectedRec] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [targetCompany, setTargetCompany] = useState('');
  const [targetRole, setTargetRole] = useState('');

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    setLoading(true);
    try {
      const response = await recommendationAPI.getMyRecommendations();
      setRecommendations(response.data.recommendations);
    } catch (err) {
      setError('Failed to fetch recommendations');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateRecommendation = async (e) => {
    e.preventDefault();
    if (!targetCompany || !targetRole) {
      setError('Please fill in both fields');
      return;
    }

    setLoading(true);
    try {
      await recommendationAPI.generateRecommendation({
        targetCompany,
        targetRole,
      });
      setTargetCompany('');
      setTargetRole('');
      await fetchRecommendations();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to generate recommendation');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRecommendation = async (id) => {
    try {
      await recommendationAPI.deleteRecommendation(id);
      await fetchRecommendations();
    } catch (err) {
      setError('Failed to delete recommendation');
    }
  };

  return (
    <div className="recommendations-page">
      <h2>Personalized Recommendations</h2>

      {error && <div className="error-message">{error}</div>}

      <div className="generate-section">
        <h3>Generate a New Recommendation</h3>
        <form onSubmit={handleGenerateRecommendation}>
          <div className="form-group">
            <label>Target Company</label>
            <input
              type="text"
              value={targetCompany}
              onChange={(e) => setTargetCompany(e.target.value)}
              placeholder="e.g., Google, Amazon"
            />
          </div>
          <div className="form-group">
            <label>Target Role</label>
            <input
              type="text"
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              placeholder="e.g., Software Engineer"
            />
          </div>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Generating...' : 'Generate Recommendation'}
          </button>
        </form>
      </div>

      {loading && <p className="loading">Loading...</p>}

      <div className="recommendations-list">
        <h3>Your Recommendations</h3>
        {recommendations.length === 0 ? (
          <p>No recommendations yet. Generate one above!</p>
        ) : (
          recommendations.map((rec) => (
            <div key={rec._id} className="rec-card">
              <div className="rec-header">
                <h4>{rec.targetRole} at {rec.targetCompany}</h4>
                <button
                  className="btn-delete"
                  onClick={() => handleDeleteRecommendation(rec._id)}
                >
                  Delete
                </button>
              </div>

              <div className="rec-content">
                <p><strong>Estimated Preparation Days:</strong> {rec.estimatedPreparationDays}</p>

                <div className="skill-gaps">
                  <h5>Skill Gaps:</h5>
                  <ul>
                    {rec.skillGaps.map((gap, idx) => (
                      <li key={idx}>
                        {gap.skill}: Current {gap.currentLevel}/5 → Target {gap.targetLevel}/5
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="learning-path">
                  <h5>Recommended Learning Path:</h5>
                  <div className="path-steps">
                    {rec.recommendedLearningPath.map((step, idx) => (
                      <div key={idx} className="step">
                        <span className="step-num">{step.step}</span>
                        <div className="step-info">
                          <strong>{step.topic}</strong>
                          <p>Duration: {step.duration}</p>
                          <p>Priority: {step.priority}</p>
                          <div className="resources">
                            {step.resources.map((res, i) => (
                              <span key={i} className="resource-tag">{res}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="interview-tips">
                  <h5>Interview Tips:</h5>
                  <ul>
                    {rec.interviewTips.map((tip, idx) => (
                      <li key={idx}>{tip}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Recommendations;
