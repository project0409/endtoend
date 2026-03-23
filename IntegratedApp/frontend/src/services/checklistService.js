import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL ? `${process.env.REACT_APP_API_URL}/api/checklists` : 'http://localhost:5000/api/checklists';

const checklistService = {
  createChecklist: async (checklistData) => {
    const token = localStorage.getItem('token');
    const response = await axios.post(API_URL, checklistData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  getUserChecklists: async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  getChecklistById: async (id) => {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  updateChecklist: async (id, checklistData) => {
    const token = localStorage.getItem('token');
    const response = await axios.put(`${API_URL}/${id}`, checklistData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  toggleChecklistItem: async (id, itemId) => {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${API_URL}/${id}/toggle`, { itemId }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  deleteChecklist: async (id) => {
    const token = localStorage.getItem('token');
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  }
};

export default checklistService;
