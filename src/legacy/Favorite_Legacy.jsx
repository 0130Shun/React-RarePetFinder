import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
// services
import {
  // getFavoritesApi,
  getFavoriteStores,
  addFavoriteApi,
  removeFavoriteApi,
} from '@/services/favoriteService';
// hook
import { useToast } from '@/hook/useToast';
// components
import SubHero from '@/components/subHero/SubHero';
import FullPageLoader from '@/components/shared/FullPageLoader';
import StoreCard from '@/components/StoreCard.jsx';
// utils
import { extractErrorMessage } from '@/utils/errorHandler';

// 之後處理分頁每頁顯示 9 筆店家和側邊搜尋
// const PAGE_SIZE = 9;

const Favorite_Legacy = () => {
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const location = useLocation();
  const user = useSelector((state) => state.user.user); // 從state取出會員資料
  const [favoritesMap, setFavoritesMap] = useState({}); // 用來存篩以登入的user的favoritesMap狀態，運作起來會類似這樣變成清單比對  => favoritesMap = {
  //   storeId: favoriteId,
  //   3: 12,
  //   8: 15,
  //   21: 30,
  // };
  const { showError, warning } = useToast();
  const [isScreenLoading, setIsScreenLoading] = useState(false);
  const [allFavorites, setAllFavorites] = useState([]); //從 API 抓回來的「全部店家」

  // handleToggleFavorite => 愛心收藏 <=> 退出收藏
  const handleToggleFavorite = async (storeId) => {
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
    } finally {
      loadFavorites();
    }
  };

  const loadFavorites = async () => {
    if (!user) return;

    setIsScreenLoading(true);

    try {
      const favorites = await getFavoriteStores(user.id);

      const map = {};
      // f.id = 店家 id 、f.favoriteId = 收藏資料 id
      // 這樣 favoritesMap 才會變成：
      // {
      //   3: 12,
      //   8: 15
      // }
      favorites.forEach((f) => {
        map[f.id] = f.favoriteId;
      });

      setFavoritesMap(map);
      setAllFavorites(favorites);
    } catch (error) {
      const errorMessage = extractErrorMessage(
        error,
        null,
        '載入收藏店家資料失敗，請重新刷新頁面。'
      );
      showError(errorMessage);
    } finally {
      setIsScreenLoading(false);
    }
  };

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (!user) {
      // user logout時，清掉 favorite
      setFavoritesMap({});
      setAllFavorites([]);
      return;
    }

    loadFavorites();
  }, [user]);

  // if (!user) return <div>請重新登入</div>;

  return (
    <>
      <SubHero variant="favorite" />
      <section className="container ui-container mt-md-5">
        <div className="row mx-0 mx-md-auto">
          <div className="col-12 d-md-none p-3">
            {/* <div className="findStores-search mb-36 mobile-search">
              <div className="d-flex justify-content-between">
                <span className="span-style">搜尋</span>
                <button
                  type="button"
                  className="fw-bold shadow-sm btn-style"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#searchOffcanvas"
                >
                  進階篩選
                  <img className="sliders" src={Sliders} alt="imgSliders" />
                </button>
              </div>
              <form onSubmit={handleSubmit(onSubmitSearch)}>
                <div className="findStores-search-group mt-12">
                  <div className="findStores-search-bar text">
                    <Controller
                      name="query"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          placeholder="搜尋關鍵字"
                        />
                      )}
                    />
                    <button type="submit">
                      <img src={Search} alt="imgSearch" />
                    </button>
                  </div>
                  <div className="findStores-search-button">
                    <button type="button" onClick={onResetQueryOnly}>
                      重置
                    </button>
                  </div>
                </div>
              </form>
            </div> */}
          </div>
        </div>
        <div className="row mx-0 mx-md-auto ">
          <aside className="col-lg-3"></aside>
          <main className="col-lg-9 text-center text-lg-start">
            {allFavorites.length === 0 && !isScreenLoading && (
              <div className="text-center text-muted py-5">
                尚未收藏任何店家
              </div>
            )}

            {allFavorites.map((store) => (
              <div key={store.id} className="col-lg-4 col-md-6 col-12">
                <StoreCard
                  store={store}
                  isFavorite={!!favoritesMap[store.id]}
                  onToggleFavorite={handleToggleFavorite}
                />
              </div>
            ))}
          </main>
        </div>
      </section>
      {/* ScreenLoading */}
      <FullPageLoader show={isScreenLoading} zIndex={2000} />
    </>
  );
};

export default Favorite_Legacy;
