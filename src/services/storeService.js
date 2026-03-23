import apiClient from './apiClient';

export const storeService = {
  // 一次抓全量，前端自行 filter / slice
  async getAllStores() {
    const res = await apiClient.get('/stores');
    return Array.isArray(res.data) ? res.data : [];
  },
  // 單一店家
  async getStoreDetail(id) {
    const res = await apiClient.get(`/stores/${id}`);
    return res.data;
  },
};
