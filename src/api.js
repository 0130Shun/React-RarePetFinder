import axios from 'axios';
// const API_URL = 'http://localhost:3001';
// 請建立.env後，請設定"VITE_API_URL=http://localhost:3001"
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

};
