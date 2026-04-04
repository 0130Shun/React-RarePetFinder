import { useCallback } from 'react';

// services
import { addFavoriteApi, removeFavoriteApi } from '@/services/favoriteService';
// hook;
import { useToast } from '@/hooks/useToast';
// utils
import { extractErrorMessage } from '@/utils/errorHandler';

export const useFavorite = (
  user,
  favoritesMap,
  setFavoritesMap,
  options = {}
) => {
  const { warning, showError } = useToast(); //引用外部hook或component給toggleFavorite使用

  // useFavorite 邏輯層，補上useCallback避免「無關的 re-render」
  const toggleFavorite = useCallback(
    async (storeId) => {
      if (!user) {
        warning('登入後就可以收藏店家。');
        return;
      }

      // const isFav = !!favoritesMap[storeId];
      const isFav = storeId in favoritesMap;

      try {
        if (isFav) {
          await removeFavoriteApi(favoritesMap[storeId]);

          setFavoritesMap((prev) => {
            const newMap = { ...prev };
            delete newMap[storeId];
            return newMap;
          });
          // 通知外部（重點）
          options.onRemove?.(storeId);
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
    },
    [user, favoritesMap, options, setFavoritesMap, warning, showError]
  );

  return { toggleFavorite };
};
