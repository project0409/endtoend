import React, { useState, useEffect } from 'react';
import { experienceAPI } from '../services/api';
import '../styles/browse.css';

const BrowseExperiences = () => {
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState('');
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState('');
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await experienceAPI.getCompanies();
      setCompanies(response.data);
    } catch (err) {
      setError('Failed to fetch companies');
    }
  };

  const handleCompanyChange = async (e) => {
    const company = e.target.value;
    setSelectedCompany(company);
    setSelectedRole('');
    setExperiences([]);

    if (company) {
      try {
        const response = await experienceAPI.getJobRolesByCompany(company);
        setRoles(response.data);
      } catch (err) {
        setError('Failed to fetch roles');
      }
    }
  };

  const handleRoleChange = async (e) => {
    const role = e.target.value;
    setSelectedRole(role);
    setLoading(true);

    try {
      const response = await experienceAPI.getExperiencesByCompanyRole(
        selectedCompany,
        role
      );
      setExperiences(response.data.experiences);
      setError('');
    } catch (err) {
      setError('Failed to fetch experiences');
      setExperiences([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="browse-experiences">
      <h2>Browse Interview Experiences</h2>

      <div className="filter-section">
        <div className="filter-group">
          <label>Select Company:</label>
          <select value={selectedCompany} onChange={handleCompanyChange}>
            <option value="">-- Choose Company --</option>
            {companies.map((company) => (
              <option key={company} value={company}>
                {company}
              </option>
            ))}
          </select>
        </div>

        {selectedCompany && (
          <div className="filter-group">
            <label>Select Role:</label>
            <select value={selectedRole} onChange={handleRoleChange}>
              <option value="">-- Choose Role --</option>
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {error && <div className="error-message">{error}</div>}
      {loading && <div className="loading">Loading experiences...</div>}

      <div className="experiences-list">
        {experiences.map((exp) => (
          <div key={exp._id} className="experience-card">
            <h3>{exp.jobRole} at {exp.company}</h3>
            <p><strong>Interview Type:</strong> {exp.interviewType}</p>
            <p><strong>Round:</strong> {exp.round}</p>
            <p><strong>Result:</strong> {exp.result}</p>
            <p><strong>Rating:</strong> {exp.rating}/5</p>
            {exp.skillsRequired.length > 0 && (
              <div className="skills">
                <strong>Skills Required:</strong>
                <div className="skill-tags">
                  {exp.skillsRequired.map((skill, idx) => (
                    <span key={idx} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
            )}
            <p><strong>Preparation Tips:</strong> {exp.preparationTips}</p>
          </div>
        ))}
      </div>

      {experiences.length === 0 && selectedRole && !loading && (
        <p className="no-experiences">No experiences found for this selection.</p>
      )}
    </div>
  );
};

export default BrowseExperiences;
