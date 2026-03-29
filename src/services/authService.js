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

// 取得 帳號登入 當前使用者資料 (/me)
export const getCurrentUser = async () => {
  try {
    const res = await apiClient.get('/me');
    return res.data; // 回傳 { id, email, username, role, ... }
  } catch (error) {
    console.error('取得 /me 失敗:', error.response?.data || error.message);

    // Token 無效或過期時，自動清除 token
    if (error.response?.status === 401) {
      localStorage.removeItem('accessToken');
      throw new Error('登入已過期，請重新登入');
    }

    throw error; // 其他錯誤直接往上拋
  }
};

// 不需要登出Api，直接清除 Token即可
export const logout = () => {
  localStorage.removeItem('accessToken');
};

// 檢查是否已登入（簡單版）
export const isLoggedIn = () => {
  return !!localStorage.getItem('accessToken');
};
