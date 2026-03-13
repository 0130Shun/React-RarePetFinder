import apiClient from './apiClient';

export const announcementService = {
  //詐騙資訊列表
  async getAllAnnouncements() {
    const respones = await apiClient.get('/announcements');
    return Array.isArray(respones.data) ? respones.data : [];
  },
  // 單一詐騙資訊
  async getAnnouncement(id) {
    const res = await apiClient.get(`/announcements/${id}`);
    return res.data;
  },
};
