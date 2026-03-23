import axios from 'axios';

const API_URL = 'http://localhost:5004/api/assessments';

const assessmentService = {
  createAssessment: async (assessmentData) => {
    const token = localStorage.getItem('token');
    const response = await axios.post(API_URL, assessmentData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  getUserAssessments: async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  getAssessmentById: async (id) => {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  updateAssessment: async (id, assessmentData) => {
    const token = localStorage.getItem('token');
    const response = await axios.put(`${API_URL}/${id}`, assessmentData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  deleteAssessment: async (id) => {
    const token = localStorage.getItem('token');
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  }
};

export default assessmentService;
