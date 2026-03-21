// import axios from 'axios';
import apiClient from './apiClient';

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
