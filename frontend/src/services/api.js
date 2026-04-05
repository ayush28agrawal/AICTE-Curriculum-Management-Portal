import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  login: (data) => api.post('/auth/login', data),
  register: (data) => api.post('/auth/register', data),
  getProfile: () => api.get('/auth/profile'),
  getInstitutes: () => api.get('/auth/institutes'),
};

// Curriculum APIs
export const curriculumAPI = {
  getAll: (params) => api.get('/curriculums', { params }),
  getById: (id) => api.get(`/curriculums/${id}`),
  create: (data) => api.post('/curriculums', data),
  update: (id, data) => api.put(`/curriculums/${id}`, data),
  addSemester: (id, data) => api.post(`/curriculums/${id}/semesters`, data),
  addSubject: (id, semesterIndex, data) => 
    api.post(`/curriculums/${id}/semesters/${semesterIndex}/subjects`, data),
  uploadSyllabus: (id, formData) => 
    api.post(`/curriculums/${id}/upload-syllabus`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  downloadSyllabus: (id) => 
    api.get(`/curriculums/${id}/download`, { responseType: 'blob' }),
  publish: (id) => api.post(`/curriculums/${id}/publish`),
  archive: (id) => api.post(`/curriculums/${id}/archive`),
  delete: (id) => api.delete(`/curriculums/${id}`),
};

// Submission APIs
export const submissionAPI = {
  getAll: (params) => api.get('/submissions', { params }),
  getMySubmissions: () => api.get('/submissions/my-submissions'),
  getById: (id) => api.get(`/submissions/${id}`),
  create: (formData) => 
    api.post('/submissions', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  updateStatus: (id, data) => api.put(`/submissions/${id}/status`, data),
  downloadFile: (id) => 
    api.get(`/submissions/${id}/download`, { responseType: 'blob' }),
  getStats: () => api.get('/submissions/stats'),
};

// Analytics APIs
export const analyticsAPI = {
  getDashboardStats: () => api.get('/analytics/dashboard'),
  getCurriculumAdoption: () => api.get('/analytics/adoption'),
  getRecentActivity: (limit) => api.get('/analytics/activity', { params: { limit } }),
};

export default api;

