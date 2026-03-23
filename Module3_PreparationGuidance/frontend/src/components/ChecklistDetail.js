import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import checklistService from '../services/checklistService';

function ChecklistDetail() {
  const [checklist, setChecklist] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchChecklist();
  }, [id]);

  const fetchChecklist = async () => {
    try {
      const response = await checklistService.getChecklistById(id);
      setChecklist(response.checklist);
    } catch (error) {
      console.error('Error fetching checklist:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async (itemId) => {
    try {
      const response = await checklistService.toggleChecklistItem(id, itemId);
      setChecklist(response.checklist);
    } catch (error) {
      alert('Failed to update item');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!checklist) return <div>Checklist not found</div>;

  return (
    <div className="container">
      <div className="header">
        <h1>{checklist.company} - {checklist.role}</h1>
        <button className="btn-secondary" onClick={() => navigate('/checklists')}>Back</button>
      </div>

      <div className="checklist-detail">
        <div className="progress-section">
          <h3>Progress: {checklist.progress}%</h3>
          <div className="progress-bar-large">
            <div className="progress-fill" style={{ width: `${checklist.progress}%` }}></div>
          </div>
          {checklist.targetDate && (
            <p className="target-date">Target Date: {new Date(checklist.targetDate).toLocaleDateString()}</p>
          )}
        </div>

        <div className="items-section">
          <h3>Checklist Items</h3>
          {checklist.items.map((item) => (
            <div key={item._id} className={`checklist-item ${item.completed ? 'completed' : ''}`}>
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => handleToggle(item._id)}
              />
              <div className="item-content">
                <h4>{item.title}</h4>
                {item.description && <p>{item.description}</p>}
                <span className="category-badge">{item.category}</span>
                {item.completedAt && (
                  <span className="completed-date">
                    Completed: {new Date(item.completedAt).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ChecklistDetail;
