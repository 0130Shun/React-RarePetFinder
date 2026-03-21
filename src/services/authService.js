// import axios from 'axios';
import apiClient from './apiClient';

// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
// const api = axios.create({
//   baseURL: API_URL,
// });

// 帳號註冊
export const registerApi = async (data) => {
  const res = await apiClient.post('/register', data); // 改成 register 跑一次
  return res.data;
};

// 帳號登入
export const loginApi = async (data) => {
  const res = await apiClient.post('/login', data); // 改成 register 跑一次
  return res.data;
};

// 帳號資料update
export const updateUserApi = async (userId, data) => {
  const res = await apiClient.patch(`/users/${userId}`, data);
  return res.data;
};

// 不需要登出Api，直接清除 Token即可
