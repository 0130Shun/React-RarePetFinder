import apiClient from './apiClient';

export const adminService = {
  // 會員相關 API
  async getMembers() {
    const res = await apiClient.get('/users');
    return res.data;
  },
  async registerMembers(id, data) {
    const res = await apiClient.post('/register', data); // 改成 register 跑一次
    return res.data;
  },

  async updateMember(id, data) {
    const res = await apiClient.patch(`/users/${id}`, data);
    return res.data;
  },

  // 店家相關 API
  async getStores() {
    const res = await apiClient.get('/stores');
    return res.data;
  },

  async createStore(data) {
    return apiClient.post('/stores', data);
  },

  async updateStore(id, data) {
    return apiClient.put(`/stores/${id}`, data);
  },

  async deleteStore(id) {
    return apiClient.delete(`/stores/${id}`);
  },

  // 文章相關 API
  async getArticles() {
    const res = await apiClient.get('/articles');
    return res.data;
  },
  async createArticle(data) {
    return apiClient.post('/articles', data);
  },

  async updateArticle(id, data) {
    return apiClient.put(`/articles/${id}`, data);
  },

  async deleteArticle(id) {
    return apiClient.delete(`/articles/${id}`);
  },

  //
  async getAnnouncements() {
    const res = await apiClient.get('/announcements');
    return res.data;
  },
  async createAnnouncement(data) {
    return apiClient.post('/announcements', data);
  },

  async updateAnnouncement(id, data) {
    return apiClient.put(`/announcements/${id}`, data);
  },

  async deleteAnnouncement(id) {
    return apiClient.delete(`/announcements/${id}`);
  },

  // 活動相關 API
  async getEvents() {
    const res = await apiClient.get('/events');
    return res.data;
  },
  async createEvent(data) {
    return apiClient.post('/events', data);
  },

  async updateEvent(id, data) {
    return apiClient.put(`/events/${id}`, data);
  },

  async deleteEvent(id) {
    return apiClient.delete(`/events/${id}`);
  },
};
