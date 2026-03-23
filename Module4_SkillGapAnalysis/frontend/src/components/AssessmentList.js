import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import assessmentService from '../services/assessmentService';

function AssessmentList() {
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAssessments();
  }, []);

  const fetchAssessments = async () => {
    try {
      const response = await assessmentService.getUserAssessments();
      setAssessments(response.assessments);
    } catch (error) {
      console.error('Error fetching assessments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this assessment?')) {
      try {
        await assessmentService.deleteAssessment(id);
        setAssessments(assessments.filter(a => a._id !== id));
      } catch (error) {
        alert('Failed to delete assessment');
      }
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

  return (
    <div className="container">
      <div className="header">
        <h1>My Skill Gap Assessments</h1>
        <button className="btn" onClick={() => navigate('/create')}>New Assessment</button>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : assessments.length === 0 ? (
        <div className="empty-state">
          <p>You haven't created any assessments yet.</p>
          <button className="btn" onClick={() => navigate('/create')}>Create Your First Assessment</button>
        </div>
      ) : (
        <div className="assessment-grid">
          {assessments.map((assessment) => (
            <div key={assessment._id} className="assessment-card">
              <h3>{assessment.targetRole}</h3>
              {assessment.targetCompany && <p className="company">{assessment.targetCompany}</p>}
              
              <div className="score-section">
                <div className="score-circle" style={{ borderColor: getReadinessColor(assessment.readinessLevel) }}>
                  <span className="score">{assessment.overallScore}%</span>
                </div>
                <p className="readiness" style={{ color: getReadinessColor(assessment.readinessLevel) }}>
                  {assessment.readinessLevel.replace('-', ' ').toUpperCase()}
                </p>
              </div>

              <div className="stats">
                <div className="stat">
                  <span className="stat-label">Skill Gaps</span>
                  <span className="stat-value">{assessment.skillGaps.length}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Current Skills</span>
                  <span className="stat-value">{assessment.currentSkills.length}</span>
                </div>
              </div>

              <p className="date">Created: {new Date(assessment.createdAt).toLocaleDateString()}</p>

              <div className="card-actions">
                <button className="btn-small" onClick={() => navigate(`/assessment/${assessment._id}`)}>View Details</button>
                <button className="btn-small btn-danger" onClick={() => handleDelete(assessment._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AssessmentList;
