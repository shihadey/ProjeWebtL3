import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000', // Remplacez-le par votre URL backend
  timeout: 10000 // Timeout de 10 secondes
});

// Ajouter un intercepteur pour inclure le token JWT dans chaque requête
instance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default instance;
