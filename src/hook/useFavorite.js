import { addFavoriteApi, removeFavoriteApi } from '@/services/favoriteService';
import { extractErrorMessage } from '@/utils/errorHandler';
import { useToast } from '@/hook/useToast';

export const useFavorite = (user, favoritesMap, setFavoritesMap) => {
  const { warning, showError } = useToast();

  const toggleFavorite = async (storeId) => {
    if (!user) {
      warning('登入後就可以收藏店家。');
      return;
    }

    const isFav = !!favoritesMap[storeId];

    try {
      if (isFav) {
        await removeFavoriteApi(favoritesMap[storeId]);

        setFavoritesMap((prev) => {
          const newMap = { ...prev };
          delete newMap[storeId];
          return newMap;
        });
      } else {
        const now = new Date();
        const res = await addFavoriteApi({
          userId: user.id,
          storeId,
          createdAt: now,
        });

        setFavoritesMap((prev) => ({
          ...prev,
          [storeId]: res.id,
        }));
      }
    } catch (err) {
      const errorMessage = extractErrorMessage(
        err,
        null,
        '載入收藏店家資料失敗，請重新刷新頁面。'
      );
      showError(errorMessage);
    }
  };

  return { toggleFavorite };
};
