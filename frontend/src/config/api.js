const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081/api';

export const API_ENDPOINTS = {
  // Auth
  USER_LOGIN: `${API_BASE_URL}/auth/userLogin`,
  ADMIN_LOGIN: `${API_BASE_URL}/auth/AdminLogin`,
  ORGANIZER_LOGIN: `${API_BASE_URL}/auth/organizerLogin`,
  
  // User Management
  REGISTER_USER: `${API_BASE_URL}/add/addusers`,
  GET_ALL_USERS: `${API_BASE_URL}/get/getAllUsers`,
  UPDATE_USER: `${API_BASE_URL}/update/updateUser`,
  DELETE_USER: `${API_BASE_URL}/delete/deleteUser`,
};

export default API_BASE_URL;

