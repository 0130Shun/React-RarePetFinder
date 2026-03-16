// 請建立.env後，請設定 VITE_API_URL='https://rarepetfinder-api.onrender.com'
// 如果沒全域安裝，請加入 npx：npx json-server -w db.json -p 3001
// 啟動指令： json-server --watch db.json --port 3001 或簡寫： json-server -w db.json -p 3001
// auth動指令：json-server-auth db.json --port 3001 簡寫： json-server-auth -p 3001 db.json 或 npm run backend
// api.js將改名稱apiClient並放置api裡面，但避免多人協作參照問題先暫時不刪除api.js
// npx json-server-auth db.json -p 3001 or json-server-auth db.json --port 3001 或 npm run backend:auth

import axios from 'axios';
// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
const API_URL = 'http://localhost:3001';

// apiClient.js 只做 axios instance，所有 API 都共用這個 instance。
// storeService、articleService、announcementService分開抽出去，讓功能更單純化
const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 5000,
});

// 自動帶 token（未來登入可用）
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default apiClient;
