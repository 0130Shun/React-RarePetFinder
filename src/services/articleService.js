import apiClient from './apiClient';

export const articleService = {
  //專欄列表
  async getAllArticles() {
    const respones = await apiClient.get('/articles');
    return Array.isArray(respones.data) ? respones.data : [];
  },
  // 單一專欄
  async getArticle(id) {
    const res = await apiClient.get(`/articles/${id}`);
    return res.data;
  },
};
