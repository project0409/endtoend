import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import checklistService from '../../services/checklistService';

function ChecklistForm() {
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    targetDate: '',
    items: [
      { title: 'Review company background', category: 'research', completed: false },
      { title: 'Practice coding problems', category: 'technical', completed: false },
      { title: 'Prepare behavioral questions', category: 'behavioral', completed: false }
    ]
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index][field] = value;
    setFormData({ ...formData, items: newItems });
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { title: '', category: 'technical', completed: false }]
    });
  };

  const removeItem = (index) => {
    const newItems = formData.items.filter((_, i) => i !== index);
    setFormData({ ...formData, items: newItems });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await checklistService.createChecklist(formData);
      setMessage('Checklist created successfully!');
      setTimeout(() => navigate('/checklists'), 2000);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to create checklist');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Create Preparation Checklist</h1>
        <button className="btn-secondary" onClick={() => navigate('/checklists')}>Back</button>
      </div>

      <div className="form-container">
        {message && <div className={message.includes('success') ? 'success-message' : 'error-message'}>{message}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Company *</label>
            <input type="text" name="company" value={formData.company} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Role *</label>
            <input type="text" name="role" value={formData.role} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Target Date</label>
            <input type="date" name="targetDate" value={formData.targetDate} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Checklist Items</label>
            {formData.items.map((item, index) => (
              <div key={index} className="item-row">
                <input
                  type="text"
                  placeholder="Item title"
                  value={item.title}
                  onChange={(e) => handleItemChange(index, 'title', e.target.value)}
                  required
                />
                <select
                  value={item.category}
                  onChange={(e) => handleItemChange(index, 'category', e.target.value)}
                >
                  <option value="technical">Technical</option>
                  <option value="behavioral">Behavioral</option>
                  <option value="research">Research</option>
                  <option value="practice">Practice</option>
                </select>
                <button type="button" className="btn-small btn-danger" onClick={() => removeItem(index)}>Remove</button>
              </div>
            ))}
            <button type="button" className="btn-secondary" onClick={addItem}>Add Item</button>
          </div>

          <button type="submit" className="btn" disabled={loading}>
            {loading ? 'Creating...' : 'Create Checklist'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChecklistForm;
