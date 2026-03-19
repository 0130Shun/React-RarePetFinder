import apiClient from './apiClient';

// articles + announcements整合，功能趨同和使用版面雷同

export const contentService = {
  async getAllArticles() {
    const res = await apiClient.get('/articles');
    return Array.isArray(res.data) ? res.data : [];
  },

  async getArticle(id) {
    const res = await apiClient.get(`/articles/${id}`);
    return res.data;
  },

  async getAllAnnouncements() {
    const res = await apiClient.get('/announcements');
    return Array.isArray(res.data) ? res.data : [];
  },

  async getAnnouncement(id) {
    const res = await apiClient.get(`/announcements/${id}`);
    return res.data;
  },
};
