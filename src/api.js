import axios from 'axios';
// const API_URL = 'http://localhost:3001';
// 請建立.env後，請設定 VITE_API_URL='https://rarepetfinder-api.onrender.com'
// 如果沒全域安裝，請加入 npx：npx json-server -w db.json -p 3001
// 啟動指令： json-server --watch db.json --port 3001 或簡寫： json-server -w db.json -p 3001
// auth動指令：json-server-auth db.json --port 3001 簡寫： json-server-auth -p 3001 db.json

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const apiRequest = axios.create({
  baseURL: API_URL,
  timeout: 5000,
});

export const storeService = {
  // 方法 C：一次抓全量，前端自行 filter / slice
  async getAllStores() {
    const res = await apiRequest.get('/stores');
    return Array.isArray(res.data) ? res.data : [];
  },
  // 單一店家
  async getStoreDetail(id) {
    const res = await apiRequest.get(`/stores/${id}`);
    return res.data;
  },

  //專欄列表
  async getAllArticles() {
    const respones = await apiRequest.get('/articles');
    return Array.isArray(respones.data) ? respones.data : [];
  },
  // 單一專欄
  async getArticle(id) {
    const res = await apiRequest.get(`/articles/${id}`);
    return res.data;
  },

  //詐騙資訊列表
  async getAllAnnouncements() {
    const respones = await apiRequest.get('/announcements');
    return Array.isArray(respones.data) ? respones.data : [];
  },
  // 單一詐騙資訊
  async getAnnouncement(id) {
    const res = await apiRequest.get(`/announcements/${id}`);
    return res.data;
  },
};
