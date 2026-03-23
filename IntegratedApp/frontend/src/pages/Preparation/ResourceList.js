import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import resourceService from '../../services/resourceService';

function ResourceList() {
  const [resources, setResources] = useState([]);
  const [filters, setFilters] = useState({ category: '', difficulty: '', type: '' });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchResources = async () => {
    try {
      const response = await resourceService.getAllResources(filters);
      setResources(response.resources);
    } catch (error) {
      console.error('Error fetching resources:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = () => {
    fetchResources();
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Preparation Resources</h1>
        <div className="header-actions">
          <button className="btn" onClick={() => navigate('/resources/create')}>Add Resource</button>
          <button className="btn-secondary" onClick={() => navigate('/checklists')}>My Checklists</button>
        </div>
      </div>

      <div className="filter-section">
        <select name="category" value={filters.category} onChange={handleFilterChange}>
          <option value="">All Categories</option>
          <option value="technical">Technical</option>
          <option value="behavioral">Behavioral</option>
          <option value="aptitude">Aptitude</option>
          <option value="hr">HR</option>
          <option value="case-study">Case Study</option>
          <option value="coding">Coding</option>
          <option value="system-design">System Design</option>
        </select>
        <select name="difficulty" value={filters.difficulty} onChange={handleFilterChange}>
          <option value="">All Levels</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
        <select name="type" value={filters.type} onChange={handleFilterChange}>
          <option value="">All Types</option>
          <option value="article">Article</option>
          <option value="video">Video</option>
          <option value="course">Course</option>
          <option value="book">Book</option>
          <option value="practice">Practice</option>
          <option value="tutorial">Tutorial</option>
        </select>
        <button className="btn" onClick={handleSearch}>Search</button>
      </div>

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="card-grid">
          {resources.map((resource) => (
            <div key={resource._id} className="card">
              <div className="card-header">
                <h3>{resource.title}</h3>
                <span className={`badge ${resource.difficulty}`}>{resource.difficulty}</span>
              </div>
              <p className="description">{resource.description}</p>
              <div className="tags">
                <span className="tag">{resource.category}</span>
                <span className="tag">{resource.type}</span>
                {resource.isPremium && <span className="tag premium">Premium</span>}
              </div>
              {resource.skills && resource.skills.length > 0 && (
                <div className="skills-list">
                  {resource.skills.map((skill, idx) => (
                    <span key={idx} className="skill-tag">{skill}</span>
                  ))}
                </div>
              )}
              {resource.url && (
                <a href={resource.url} target="_blank" rel="noopener noreferrer" className="btn-link">
                  View Resource
                </a>
              )}
              {resource.rating > 0 && (
                <div className="rating">{'⭐'.repeat(Math.round(resource.rating))}</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ResourceList;
