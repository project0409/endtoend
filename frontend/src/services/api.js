import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
  updateProfile: (data) => api.put('/auth/profile', data),
};

// Experience API
export const experienceAPI = {
  getCompanies: () => api.get('/experiences/companies'),
  getJobRolesByCompany: (company) => 
    api.get(`/experiences/companies/${company}/roles`),
  getExperiencesByCompanyRole: (company, jobRole) =>
    api.get('/experiences', { params: { company, jobRole } }),
  getExperience: (id) => api.get(`/experiences/${id}`),
  shareExperience: (data) => api.post('/experiences', data),
  getMyExperiences: () => api.get('/experiences/my/all'),
  updateExperience: (id, data) => api.put(`/experiences/${id}`, data),
  deleteExperience: (id) => api.delete(`/experiences/${id}`),
};

// Guidance API
export const guidanceAPI = {
  getGuidance: (company, jobRole) =>
    api.get('/guidance', { params: { company, jobRole } }),
  getAllGuidelines: () => api.get('/guidance/all'),
  createGuidance: (data) => api.post('/guidance', data),
  updateGuidance: (id, data) => api.put(`/guidance/${id}`, data),
};

// Skill API
export const skillAPI = {
  createAssessment: (data) => api.post('/skills', data),
  getMyAssessments: () => api.get('/skills'),
  getSkillGapAnalysis: () => api.get('/skills/gap-analysis'),
  updateAssessment: (id, data) => api.put(`/skills/${id}`, data),
  deleteAssessment: (id) => api.delete(`/skills/${id}`),
};

// Recommendation API
export const recommendationAPI = {
  generateRecommendation: (data) => api.post('/recommendations', data),
  getMyRecommendations: () => api.get('/recommendations'),
  getRecommendation: (id) => api.get(`/recommendations/${id}`),
  deleteRecommendation: (id) => api.delete(`/recommendations/${id}`),
};

export default api;
