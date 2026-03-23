import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import experienceService from '../../services/experienceService';

function ExperienceList() {
  const [experiences, setExperiences] = useState([]);
  const [filters, setFilters] = useState({ company: '', role: '', difficulty: '', interviewType: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchExperiences = useCallback(async (activeFilters) => {
    setLoading(true);
    setError('');
    try {
      const cleanFilters = Object.fromEntries(
        Object.entries(activeFilters).filter(([, v]) => v !== '')
      );
      const response = await experienceService.getAllExperiences(cleanFilters);
      setExperiences(response.experiences || []);
    } catch (err) {
      setError('Failed to load experiences. Make sure the backend is running on port 5002.');
      setExperiences([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchExperiences(filters);
  }, [fetchExperiences]);

  const handleFilterChange = (e) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSearch = () => {
    fetchExperiences(filters);
  };

  const handleReset = () => {
    const empty = { company: '', role: '', difficulty: '', interviewType: '' };
    setFilters(empty);
    fetchExperiences(empty);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Interview Experiences</h1>
        <div className="header-actions">
          <button className="btn" onClick={() => navigate('/experiences/create')}>Share Experience</button>
          <button className="btn-secondary" onClick={() => navigate('/my-experiences')}>My Experiences</button>
        </div>
      </div>

      <div className="filter-section">
        <input
          type="text"
          name="company"
          placeholder="Search by Company..."
          value={filters.company}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="role"
          placeholder="Search by Role..."
          value={filters.role}
          onChange={handleFilterChange}
        />
        <select name="difficulty" value={filters.difficulty} onChange={handleFilterChange}>
          <option value="">All Difficulties</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <select name="interviewType" value={filters.interviewType} onChange={handleFilterChange}>
          <option value="">All Types</option>
          <option value="technical">Technical</option>
          <option value="hr">HR</option>
          <option value="managerial">Managerial</option>
          <option value="behavioral">Behavioral</option>
          <option value="case-study">Case Study</option>
        </select>
        <button className="btn" onClick={handleSearch}>Search</button>
        <button className="btn-secondary" onClick={handleReset}>Reset</button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading experiences...</div>
      ) : experiences.length === 0 ? (
        <div className="empty-state">
          <p>No experiences found. Be the first to share one!</p>
          <button className="btn" onClick={() => navigate('/experiences/create')}>
            Share Your Experience
          </button>
        </div>
      ) : (
        <>
          <p style={{ marginBottom: '15px', color: '#666' }}>{experiences.length} experience(s) found</p>
          <div className="card-grid">
            {experiences.map((exp) => (
              <div
                key={exp._id}
                className="card"
                onClick={() => navigate(`/experiences/${exp._id}`)}
              >
                <h3>{exp.company}</h3>
                <p className="subtitle">{exp.role}</p>
                <div className="tags">
                  <span className={`tag ${exp.difficulty}`}>{exp.difficulty}</span>
                  <span className="tag">{exp.interviewType}</span>
                  <span className={`tag ${exp.outcome}`}>{exp.outcome}</span>
                </div>
                <p className="date">{new Date(exp.interviewDate).toLocaleDateString()}</p>
                {exp.rating && <p className="rating">{'⭐'.repeat(exp.rating)}</p>}
                {exp.userId && (
                  <p className="small-text" style={{ marginTop: '8px' }}>
                    Shared by: {exp.userId.name}
                  </p>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default ExperienceList;
