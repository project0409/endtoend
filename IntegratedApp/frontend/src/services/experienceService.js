import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL ? `${process.env.REACT_APP_API_URL}/api/experiences` : 'http://localhost:5000/api/experiences';

const experienceService = {
  createExperience: async (experienceData) => {
    const token = localStorage.getItem('token');
    const response = await axios.post(API_URL, experienceData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  getAllExperiences: async (filters = {}) => {
    // Only include non-empty filter values
    const cleanFilters = Object.fromEntries(
      Object.entries(filters).filter(([, v]) => v !== '' && v !== null && v !== undefined)
    );
    const params = new URLSearchParams(cleanFilters);
    const url = params.toString() ? `${API_URL}?${params}` : API_URL;
    const response = await axios.get(url);
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
