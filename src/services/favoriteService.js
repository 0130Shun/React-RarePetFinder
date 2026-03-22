// import axios from 'axios';
import apiClient from './apiClient';
import { getAllStores } from './storeService';

// 取得某使用者所有收藏
export const getFavoritesApi = async (userId) => {
  const res = await apiClient.get(`/favorites?userId=${userId}`);
  return res.data;
};

// 取得收藏 + 店家完整資料
export const getFavoriteStores = async (userId) => {
  const [favorites, stores] = await Promise.all([
    getFavoritesApi(userId),
    // storeService.getAllStores(),
    getAllStores(),
  ]);

  const storeMap = new Map(stores.map((s) => [s.id, s]));

  return favorites
    .map((fav) => {
      const store = storeMap.get(fav.storeId);
      return store ? { ...store, favoriteId: fav.id } : null;
    })
    .filter(Boolean);
};

// 新增收藏
export const addFavoriteApi = async (data) => {
  const res = await apiClient.post('/favorites', data);
  return res.data;
};

// 刪除收藏
export const removeFavoriteApi = async (id) => {
  const res = await apiClient.delete(`/favorites/${id}`);
  return res.data;
};
