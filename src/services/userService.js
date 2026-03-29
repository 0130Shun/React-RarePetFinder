// services/userService.js

// 為了長期維護從 authService，讓其專心處理身份驗證
// 分拆出userService，讓其專心處理帳號資訊
import apiClient from './apiClient';

export const updateUserApi = async (userId, data) => {
  const res = await apiClient.patch(`/users/${userId}`, data);
  return res.data;
};
