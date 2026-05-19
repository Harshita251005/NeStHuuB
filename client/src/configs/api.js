import axios from 'axios';

// Base API configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API endpoints
export const userAPI = {
  register: (userData) => api.post('/users/register', userData),
  login: (credentials) => api.post('/users/login', credentials),
  getAll: () => api.get('/users'),
};

export const ownerAPI = {
  register: (ownerData) => api.post('/owners/register', ownerData),
  login: (credentials) => api.post('/owners/login', credentials),
  addPG: (pgData) => api.post('/owners/pg', pgData),
  updatePG: (pgId, pgData) => api.put(`/owners/pg/${pgId}`, pgData),
  deletePG: (pgId, ownerId) => api.delete(`/owners/pg/${pgId}`, { data: { owner_id: ownerId } }),
  getAllPGs: () => api.get('/owners/pgs'),
  getOwnerPGs: (ownerId) => api.get(`/owners/${ownerId}/pgs`),
  getAll: () => api.get('/owners'),
};

export const bookingAPI = {
  create: (bookingData) => api.post('/bookings', bookingData),
  getAll: () => api.get('/bookings'),
  getByPG: (pgId) => api.get(`/bookings/pg/${pgId}`),
  getByUser: (userId) => api.get(`/bookings/user/${userId}`),
  getByOwner: (ownerId) => api.get(`/bookings/owner/${ownerId}`),
};

export default api;