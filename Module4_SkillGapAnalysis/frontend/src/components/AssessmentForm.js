import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import assessmentService from '../services/assessmentService';

function AssessmentForm() {
  const [formData, setFormData] = useState({
    targetRole: '',
    targetCompany: '',
    currentSkills: [{ skill: '', proficiency: 'beginner' }],
    requiredSkills: [{ skill: '', importance: 'must-have', proficiency: 'intermediate' }]
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCurrentSkillChange = (index, field, value) => {
    const newSkills = [...formData.currentSkills];
    newSkills[index][field] = value;
    setFormData({ ...formData, currentSkills: newSkills });
  };

  const handleRequiredSkillChange = (index, field, value) => {
    const newSkills = [...formData.requiredSkills];
    newSkills[index][field] = value;
    setFormData({ ...formData, requiredSkills: newSkills });
  };

  const addCurrentSkill = () => {
    setFormData({
      ...formData,
      currentSkills: [...formData.currentSkills, { skill: '', proficiency: 'beginner' }]
    });
  };

  const addRequiredSkill = () => {
    setFormData({
      ...formData,
      requiredSkills: [...formData.requiredSkills, { skill: '', importance: 'must-have', proficiency: 'intermediate' }]
    });
  };

  const removeCurrentSkill = (index) => {
    const newSkills = formData.currentSkills.filter((_, i) => i !== index);
    setFormData({ ...formData, currentSkills: newSkills });
  };

  const removeRequiredSkill = (index) => {
    const newSkills = formData.requiredSkills.filter((_, i) => i !== index);
    setFormData({ ...formData, requiredSkills: newSkills });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await assessmentService.createAssessment(formData);
      setMessage('Assessment created successfully!');
      setTimeout(() => navigate(`/assessment/${response.assessment._id}`), 2000);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to create assessment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Create Skill Gap Assessment</h1>
        <button className="btn-secondary" onClick={() => navigate('/')}>Back</button>
      </div>

      <div className="form-container">
        {message && <div className={message.includes('success') ? 'success-message' : 'error-message'}>{message}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Target Role *</label>
            <input type="text" name="targetRole" value={formData.targetRole} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Target Company</label>
            <input type="text" name="targetCompany" value={formData.targetCompany} onChange={handleChange} />
          </div>

          <div className="form-section">
            <h3>Your Current Skills</h3>
            {formData.currentSkills.map((skill, index) => (
              <div key={index} className="skill-row">
                <input
                  type="text"
                  placeholder="Skill name"
                  value={skill.skill}
                  onChange={(e) => handleCurrentSkillChange(index, 'skill', e.target.value)}
                  required
                />
                <select
                  value={skill.proficiency}
                  onChange={(e) => handleCurrentSkillChange(index, 'proficiency', e.target.value)}
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                  <option value="expert">Expert</option>
                </select>
                <button type="button" className="btn-small btn-danger" onClick={() => removeCurrentSkill(index)}>Remove</button>
              </div>
            ))}
            <button type="button" className="btn-secondary" onClick={addCurrentSkill}>Add Skill</button>
          </div>

          <div className="form-section">
            <h3>Required Skills for Target Role</h3>
            {formData.requiredSkills.map((skill, index) => (
              <div key={index} className="skill-row">
                <input
                  type="text"
                  placeholder="Skill name"
                  value={skill.skill}
                  onChange={(e) => handleRequiredSkillChange(index, 'skill', e.target.value)}
                  required
                />
                <select
                  value={skill.importance}
                  onChange={(e) => handleRequiredSkillChange(index, 'importance', e.target.value)}
                >
                  <option value="must-have">Must Have</option>
                  <option value="good-to-have">Good to Have</option>
                  <option value="optional">Optional</option>
                </select>
                <select
                  value={skill.proficiency}
                  onChange={(e) => handleRequiredSkillChange(index, 'proficiency', e.target.value)}
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                  <option value="expert">Expert</option>
                </select>
                <button type="button" className="btn-small btn-danger" onClick={() => removeRequiredSkill(index)}>Remove</button>
              </div>
            ))}
            <button type="button" className="btn-secondary" onClick={addRequiredSkill}>Add Skill</button>
          </div>

          <button type="submit" className="btn" disabled={loading}>
            {loading ? 'Analyzing...' : 'Analyze Skill Gap'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AssessmentForm;
