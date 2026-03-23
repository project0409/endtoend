import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import assessmentService from '../services/assessmentService';

function AssessmentDetail() {
  const [assessment, setAssessment] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchAssessment();
  }, [id]);

  const fetchAssessment = async () => {
    try {
      const response = await assessmentService.getAssessmentById(id);
      setAssessment(response.assessment);
    } catch (error) {
      console.error('Error fetching assessment:', error);
    } finally {
      setLoading(false);
    }
  };

  const getReadinessColor = (level) => {
    const colors = {
      'well-prepared': '#28a745',
      'ready': '#17a2b8',
      'needs-improvement': '#ffc107',
      'not-ready': '#dc3545'
    };
    return colors[level] || '#6c757d';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      'high': '#dc3545',
      'medium': '#ffc107',
      'low': '#28a745'
    };
    return colors[priority] || '#6c757d';
  };

  if (loading) return <div>Loading...</div>;
  if (!assessment) return <div>Assessment not found</div>;

  return (
    <div className="container">
      <div className="header">
        <h1>Skill Gap Analysis Report</h1>
        <button className="btn-secondary" onClick={() => navigate('/')}>Back</button>
      </div>

      <div className="detail-container">
        <div className="overview-section">
          <h2>{assessment.targetRole}</h2>
          {assessment.targetCompany && <p className="company">{assessment.targetCompany}</p>}
          
          <div className="score-display">
            <div className="score-circle-large" style={{ borderColor: getReadinessColor(assessment.readinessLevel) }}>
              <span className="score-large">{assessment.overallScore}%</span>
              <span className="score-label">Overall Score</span>
            </div>
            <div className="readiness-badge" style={{ background: getReadinessColor(assessment.readinessLevel) }}>
              {assessment.readinessLevel.replace('-', ' ').toUpperCase()}
            </div>
          </div>
        </div>

        <div className="section">
          <h3>Skill Gaps ({assessment.skillGaps.length})</h3>
          {assessment.skillGaps.length === 0 ? (
            <p className="no-gaps">Great! You have all the required skills.</p>
          ) : (
            <div className="gaps-list">
              {assessment.skillGaps.map((gap, index) => (
                <div key={index} className="gap-card">
                  <div className="gap-header">
                    <h4>{gap.skill}</h4>
                    <span className="priority-badge" style={{ background: getPriorityColor(gap.priority) }}>
                      {gap.priority} priority
                    </span>
                  </div>
                  <div className="gap-levels">
                    <span>Current: <strong>{gap.currentLevel}</strong></span>
                    <span>→</span>
                    <span>Required: <strong>{gap.requiredLevel}</strong></span>
                  </div>
                  {gap.recommendations && gap.recommendations.length > 0 && (
                    <div className="recommendations">
                      <strong>Recommendations:</strong>
                      <ul>
                        {gap.recommendations.map((rec, idx) => (
                          <li key={idx}>{rec}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="section">
          <h3>Your Current Skills</h3>
          <div className="skills-grid">
            {assessment.currentSkills.map((skill, index) => (
              <div key={index} className="skill-item">
                <span className="skill-name">{skill.skill}</span>
                <span className={`proficiency-badge ${skill.proficiency}`}>{skill.proficiency}</span>
              </div>
            ))}
          </div>
        </div>

        {assessment.learningPath && assessment.learningPath.length > 0 && (
          <div className="section">
            <h3>Recommended Learning Path</h3>
            <div className="learning-path">
              {assessment.learningPath.map((item, index) => (
                <div key={index} className="path-item">
                  <div className="path-number">{item.order}</div>
                  <div className="path-content">
                    <h4>{item.skill}</h4>
                    <p className="estimated-time">Estimated Time: {item.estimatedTime}</p>
                    {item.resources && item.resources.length > 0 && (
                      <ul className="resources-list">
                        {item.resources.map((resource, idx) => (
                          <li key={idx}>{resource}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AssessmentDetail;
