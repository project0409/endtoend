import React from "react";
import { guidanceAPI } from '../services/api';
import '../styles/preparation-guide.css';

const PreparationGuide = () => {
  const [company, setCompany] = useState('');
  const [jobRole, setJobRole] = useState('');
  const [guidance, setGuidance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!company || !jobRole) {
      setError('Please fill in both fields');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await guidanceAPI.getGuidance(company, jobRole);
      setGuidance(response.data);
    } catch (err) {
      setError('Failed to fetch preparation guidance');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="preparation-guide">
      <h2>Preparation Guide</h2>

      <div className="search-section">
        <form onSubmit={handleSearch}>
          <div className="form-group">
            <label>Company</label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="e.g., Google, Microsoft"
            />
          </div>
          <div className="form-group">
            <label>Job Role</label>
            <input
              type="text"
              value={jobRole}
              onChange={(e) => setJobRole(e.target.value)}
              placeholder="e.g., Software Engineer"
            />
          </div>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Loading...' : 'Get Guidance'}
          </button>
        </form>
      </div>

      {error && <div className="error-message">{error}</div>}

      {guidance && (
        <div className="guidance-content">
          <h3>{guidance.jobRole} at {guidance.company}</h3>
          <p><strong>Estimated Preparation Time:</strong> {guidance.estimatedPreparationTime} hours</p>

          <div className="technical-skills">
            <h4>Technical Skills:</h4>
            {guidance.technicalSkills.length > 0 ? (
              <ul>
                {guidance.technicalSkills.map((skill, idx) => (
                  <li key={idx}>
                    {skill.skill} - {skill.importance}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No technical skills information available.</p>
            )}
          </div>

          <div className="soft-skills">
            <h4>Soft Skills:</h4>
            {guidance.softSkills.length > 0 ? (
              <ul>
                {guidance.softSkills.map((skill, idx) => (
                  <li key={idx}>
                    <strong>{skill.skill}:</strong> {skill.description}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No soft skills information available.</p>
            )}
          </div>

          <div className="topics">
            <h4>Topics to Study:</h4>
            {guidance.topics && guidance.topics.length > 0 ? (
              guidance.topics.map((topic, idx) => (
                <div key={idx} className="topic-card">
                  <h5>{topic.name}</h5>
                  <p>{topic.description}</p>
                  <p><strong>Difficulty:</strong> {topic.difficulty}</p>
                  {topic.resources && topic.resources.length > 0 && (
                    <div className="resources">
                      <strong>Resources:</strong>
                      <ul>
                        {topic.resources.map((res, i) => (
                          <li key={i}>
                            <a href={res.link} target="_blank" rel="noopener noreferrer">
                              {res.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p>No topics available.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PreparationGuide;
