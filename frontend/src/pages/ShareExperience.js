import React, { useState, useEffect } from 'react';
import { experienceAPI } from '../services/api';
import '../styles/share-experience.css';

const ShareExperience = () => {
  const [formData, setFormData] = useState({
    company: '',
    jobRole: '',
    interviewType: 'technical',
    round: 1,
    questionsAsked: [],
    skillsRequired: [],
    preparationTips: '',
    interviewExperience: '',
    result: 'selected',
    rating: 5,
    resourcesUsed: [],
  });

  const [currentQuestion, setCurrentQuestion] = useState({
    question: '',
    topicArea: '',
    difficulty: 'medium',
  });

  const [currentSkill, setCurrentSkill] = useState('');
  const [currentResource, setCurrentResource] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddQuestion = () => {
    if (currentQuestion.question) {
      setFormData({
        ...formData,
        questionsAsked: [...formData.questionsAsked, currentQuestion],
      });
      setCurrentQuestion({ question: '', topicArea: '', difficulty: 'medium' });
    }
  };

  const handleAddSkill = () => {
    if (currentSkill) {
      setFormData({
        ...formData,
        skillsRequired: [...formData.skillsRequired, currentSkill],
      });
      setCurrentSkill('');
    }
  };

  const handleAddResource = () => {
    if (currentResource) {
      setFormData({
        ...formData,
        resourcesUsed: [...formData.resourcesUsed, currentResource],
      });
      setCurrentResource('');
    }
  };

  const handleRemoveQuestion = (index) => {
    setFormData({
      ...formData,
      questionsAsked: formData.questionsAsked.filter((_, i) => i !== index),
    });
  };

  const handleRemoveSkill = (index) => {
    setFormData({
      ...formData,
      skillsRequired: formData.skillsRequired.filter((_, i) => i !== index),
    });
  };

  const handleRemoveResource = (index) => {
    setFormData({
      ...formData,
      resourcesUsed: formData.resourcesUsed.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!formData.company || !formData.jobRole) {
      setError('Company and Job Role are required');
      return;
    }

    try {
      await experienceAPI.shareExperience(formData);
      setMessage('Experience shared successfully!');
      setFormData({
        company: '',
        jobRole: '',
        interviewType: 'technical',
        round: 1,
        questionsAsked: [],
        skillsRequired: [],
        preparationTips: '',
        interviewExperience: '',
        result: 'selected',
        rating: 5,
        resourcesUsed: [],
      });
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to share experience');
    }
  };

  return (
    <div className="share-experience">
      <h2>Share Your Interview Experience</h2>

      {error && <div className="error-message">{error}</div>}
      {message && <div className="success-message">{message}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>Company *</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Job Role *</label>
            <input
              type="text"
              name="jobRole"
              value={formData.jobRole}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Interview Type</label>
            <select name="interviewType" value={formData.interviewType} onChange={handleChange}>
              <option value="technical">Technical</option>
              <option value="hr">HR</option>
              <option value="behavioral">Behavioral</option>
              <option value="group-discussion">Group Discussion</option>
              <option value="case-study">Case Study</option>
            </select>
          </div>
          <div className="form-group">
            <label>Round Number</label>
            <input
              type="number"
              name="round"
              value={formData.round}
              onChange={handleChange}
              min="1"
            />
          </div>
        </div>

        <div className="form-group">
          <label>Questions Asked</label>
          <div className="add-item">
            <input
              type="text"
              placeholder="Question"
              value={currentQuestion.question}
              onChange={(e) =>
                setCurrentQuestion({ ...currentQuestion, question: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Topic Area"
              value={currentQuestion.topicArea}
              onChange={(e) =>
                setCurrentQuestion({ ...currentQuestion, topicArea: e.target.value })
              }
            />
            <select
              value={currentQuestion.difficulty}
              onChange={(e) =>
                setCurrentQuestion({ ...currentQuestion, difficulty: e.target.value })
              }
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
            <button type="button" onClick={handleAddQuestion} className="btn-add">
              Add
            </button>
          </div>
          <div className="items-list">
            {formData.questionsAsked.map((q, idx) => (
              <div key={idx} className="item-tag">
                <span>{q.question} ({q.difficulty})</span>
                <button
                  type="button"
                  onClick={() => handleRemoveQuestion(idx)}
                  className="btn-remove"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Skills Required</label>
          <div className="add-item">
            <input
              type="text"
              placeholder="Skill"
              value={currentSkill}
              onChange={(e) => setCurrentSkill(e.target.value)}
            />
            <button type="button" onClick={handleAddSkill} className="btn-add">
              Add
            </button>
          </div>
          <div className="items-list">
            {formData.skillsRequired.map((skill, idx) => (
              <div key={idx} className="item-tag">
                <span>{skill}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(idx)}
                  className="btn-remove"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Resources Used</label>
          <div className="add-item">
            <input
              type="text"
              placeholder="Resource"
              value={currentResource}
              onChange={(e) => setCurrentResource(e.target.value)}
            />
            <button type="button" onClick={handleAddResource} className="btn-add">
              Add
            </button>
          </div>
          <div className="items-list">
            {formData.resourcesUsed.map((resource, idx) => (
              <div key={idx} className="item-tag">
                <span>{resource}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveResource(idx)}
                  className="btn-remove"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Preparation Tips</label>
          <textarea
            name="preparationTips"
            value={formData.preparationTips}
            onChange={handleChange}
            rows="3"
          />
        </div>

        <div className="form-group">
          <label>Interview Experience</label>
          <textarea
            name="interviewExperience"
            value={formData.interviewExperience}
            onChange={handleChange}
            rows="4"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Result</label>
            <select name="result" value={formData.result} onChange={handleChange}>
              <option value="selected">Selected</option>
              <option value="rejected">Rejected</option>
              <option value="hold">Hold</option>
            </select>
          </div>
          <div className="form-group">
            <label>Rating (1-5)</label>
            <input
              type="number"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              min="1"
              max="5"
            />
          </div>
        </div>

        <button type="submit" className="btn-primary">Share Experience</button>
      </form>
    </div>
  );
};

export default ShareExperience;
