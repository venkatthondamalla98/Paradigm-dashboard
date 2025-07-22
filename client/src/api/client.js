// src/api/client.js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

api.interceptors.request.use((config) => {
  console.log('[REQ]', config.method?.toUpperCase(), config.baseURL + config.url, {
    params: config.params,
    data: config.data,
  });
  return config;
});

api.interceptors.response.use(
  (res) => {
    console.log('[RES]', res.config.url, res.status, res.data);
    return res;
  },
  (err) => {
    console.error('[ERR]', err.config?.url, err.message, err.response?.data);
    return Promise.reject(err);
  }
);

export default api;
