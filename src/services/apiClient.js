// const API_URL = 'http://localhost:3001';
// 請建立.env後，請設定 VITE_API_URL='https://rarepetfinder-api.onrender.com'
// 如果沒全域安裝，請加入 npx：npx json-server -w db.json -p 3001
// 啟動指令： json-server --watch db.json --port 3001 或簡寫： json-server -w db.json -p 3001
// auth動指令：json-server-auth db.json --port 3001 簡寫： json-server-auth -p 3001 db.json

//api.js將改名稱apiClient並放置api裡面，但避免多人協作參照問題先暫時不刪除api.js

import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

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

// export const storeService = {
//   // 方法 C：一次抓全量，前端自行 filter / slice
//   async getAllStores() {
//     const res = await apiClient.get('/stores');
//     return Array.isArray(res.data) ? res.data : [];
//   },
//   // 單一店家
//   async getStoreDetail(id) {
//     const res = await apiClient.get(`/stores/${id}`);
//     return res.data;
//   },
//   //專欄列表
//   async getAllArticles() {
//     const respones = await apiClient.get('/articles');
//     return Array.isArray(respones.data) ? respones.data : [];
//   },
//   // 單一專欄
//   async getArticle(id) {
//     const res = await apiClient.get(`/articles/${id}`);
//     return res.data;
//   },
//   //詐騙資訊列表
//   async getAllAnnouncements() {
//     const respones = await apiClient.get('/announcements');
//     return Array.isArray(respones.data) ? respones.data : [];
//   },
//   // 單一詐騙資訊
//   async getAnnouncement(id) {
//     const res = await apiClient.get(`/announcements/${id}`);
//     return res.data;
//   },
// };
