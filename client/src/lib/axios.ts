import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const authApi = axios.create({
  baseURL: 'http://localhost:5000/api',
});

authApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers = config.headers || {};
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
