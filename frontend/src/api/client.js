import axios from 'axios';

// URL de base de l'API Django. Configurable via VITE_API_URL (voir .env du frontend).
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export const TOKEN_STORAGE_KEY = 'sih_auth_token';

const client = axios.create({ baseURL });

client.interceptors.request.use((config) => {
  const token = window.sessionStorage.getItem(TOKEN_STORAGE_KEY);
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

export default client;
