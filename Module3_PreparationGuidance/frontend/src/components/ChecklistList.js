import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import checklistService from '../services/checklistService';

function ChecklistList() {
  const [checklists, setChecklists] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchChecklists();
  }, []);

  const fetchChecklists = async () => {
    try {
      const response = await checklistService.getUserChecklists();
      setChecklists(response.checklists);
    } catch (error) {
      console.error('Error fetching checklists:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this checklist?')) {
      try {
        await checklistService.deleteChecklist(id);
        setChecklists(checklists.filter(c => c._id !== id));
      } catch (error) {
        alert('Failed to delete checklist');
      }
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1>My Preparation Checklists</h1>
        <div className="nav-buttons">
          <button className="btn" onClick={() => navigate('/checklists/create')}>Create Checklist</button>
          <button className="btn-secondary" onClick={() => navigate('/')}>Resources</button>
        </div>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : checklists.length === 0 ? (
        <div className="empty-state">
          <p>You don't have any checklists yet.</p>
          <button className="btn" onClick={() => navigate('/checklists/create')}>Create Your First Checklist</button>
        </div>
      ) : (
        <div className="checklist-grid">
          {checklists.map((checklist) => (
            <div key={checklist._id} className="checklist-card">
              <h3>{checklist.company}</h3>
              <p className="role">{checklist.role}</p>
              {checklist.targetDate && (
                <p className="date">Target: {new Date(checklist.targetDate).toLocaleDateString()}</p>
              )}
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${checklist.progress}%` }}></div>
              </div>
              <p className="progress-text">{checklist.progress}% Complete</p>
              <div className="card-actions">
                <button className="btn-small" onClick={() => navigate(`/checklists/${checklist._id}`)}>View</button>
                <button className="btn-small btn-danger" onClick={() => handleDelete(checklist._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ChecklistList;
