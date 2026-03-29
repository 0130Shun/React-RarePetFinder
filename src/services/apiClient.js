// API Server 說明
// --------------------------------------------------
// 建議先查看 package.json scripts 再啟動後端
//
// npm run backend        → json-server (mock API)
// npm run backend:auth   → json-server-auth (登入驗證)
//
// 若未使用 scripts 也可手動啟動：
// npx json-server db.json -p 3001
// npx json-server-auth db.json -p 3001
//
// 若部署正式 API：
// .env 設定 VITE_API_URL=https://rarepetfinder-api.onrender.com
// .env 設定 VITE_API_URL=https://rarepetfinder-backend.onrender.com/

import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// apiClient.js 只做 axios instance，剩餘 API 請集中於 services/*，避免直接呼叫 axios
const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 5000,
});

// 自動帶 token（測試自動處理）
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken'); // ← 改成 accessToken

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default apiClient;
