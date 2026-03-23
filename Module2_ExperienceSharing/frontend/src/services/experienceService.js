import axios from 'axios';

const API_URL = 'http://localhost:5002/api/experiences';

const experienceService = {
  createExperience: async (experienceData) => {
    const token = localStorage.getItem('token');
    const response = await axios.post(API_URL, experienceData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  getAllExperiences: async (filters = {}) => {
    const params = new URLSearchParams(filters);
    const response = await axios.get(`${API_URL}?${params}`);
    return response.data;
  },

  getExperienceById: async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },

  getUserExperiences: async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/my-experiences`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  updateExperience: async (id, experienceData) => {
    const token = localStorage.getItem('token');
    const response = await axios.put(`${API_URL}/${id}`, experienceData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  deleteExperience: async (id) => {
    const token = localStorage.getItem('token');
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  }
};

export default experienceService;
