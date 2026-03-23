import axios from 'axios';

const API_URL = 'http://localhost:5003/api/resources';

const resourceService = {
  createResource: async (resourceData) => {
    const token = localStorage.getItem('token');
    const response = await axios.post(API_URL, resourceData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  getAllResources: async (filters = {}) => {
    const params = new URLSearchParams(filters);
    const response = await axios.get(`${API_URL}?${params}`);
    return response.data;
  },

  getResourceById: async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },

  getResourcesByRole: async (role, company) => {
    const params = new URLSearchParams({ role, company });
    const response = await axios.get(`${API_URL}/by-role?${params}`);
    return response.data;
  },

  updateResource: async (id, resourceData) => {
    const token = localStorage.getItem('token');
    const response = await axios.put(`${API_URL}/${id}`, resourceData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  deleteResource: async (id) => {
    const token = localStorage.getItem('token');
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  }
};

export default resourceService;
