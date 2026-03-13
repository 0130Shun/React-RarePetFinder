import axios from 'axios';
import apiClient from './apiClient';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_URL,
});

export const loginApi = async (data) => {
  const res = await api.post('/login', data);
  return res.data;
};

export const getMe = async () => {
  const res = await apiClient.get('/me');
  return res.data;
};
