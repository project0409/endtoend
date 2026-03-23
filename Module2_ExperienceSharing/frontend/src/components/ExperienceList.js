import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import experienceService from '../services/experienceService';

function ExperienceList() {
  const [experiences, setExperiences] = useState([]);
  const [filters, setFilters] = useState({ company: '', role: '', difficulty: '', interviewType: '' });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const response = await experienceService.getAllExperiences(filters);
      setExperiences(response.experiences);
    } catch (error) {
      console.error('Error fetching experiences:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = () => {
    fetchExperiences();
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Interview Experiences</h1>
        <div className="nav-buttons">
          <button className="btn" onClick={() => navigate('/create')}>Share Experience</button>
          <button className="btn-secondary" onClick={() => navigate('/my-experiences')}>My Experiences</button>
        </div>
      </div>

      <div className="filter-section">
        <input
          type="text"
          name="company"
          placeholder="Company"
          value={filters.company}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="role"
          placeholder="Role"
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
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="experience-grid">
          {experiences.map((exp) => (
            <div key={exp._id} className="experience-card" onClick={() => navigate(`/experience/${exp._id}`)}>
              <h3>{exp.company}</h3>
              <p className="role">{exp.role}</p>
              <div className="tags">
                <span className={`tag ${exp.difficulty}`}>{exp.difficulty}</span>
                <span className="tag">{exp.interviewType}</span>
                <span className={`tag ${exp.outcome}`}>{exp.outcome}</span>
              </div>
              <p className="date">{new Date(exp.interviewDate).toLocaleDateString()}</p>
              {exp.rating && <p className="rating">Rating: {'⭐'.repeat(exp.rating)}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ExperienceList;
