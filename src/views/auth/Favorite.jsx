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

const Favorite = () => {
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
          <aside className="col-lg-3">
            <div
              className="offcanvas-lg offcanvas-top h-100"
              tabIndex="-1"
              id="searchOffcanvas"
            >
              {/*<!-- 彈跳視窗上方 / 手機板的進階篩選 --*/}
              <div className="offcanvas-header d-lg-none">
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="offcanvas"
                  data-bs-target="#searchOffcanvas"
                ></button>
              </div>
              {/*<!-- 彈跳視窗內容 -->*/}
              <div className="offcanvas-body sidebar-sticky">
                <div className="p-3 w-100">
                  <form onSubmit={handleSubmit(onSubmitSearch)}>
                    {/*<!-- 搜尋關鍵字 -->*/}
                    <div className="findStores-search mb-36">
                      <span className="span-style">搜尋</span>
                      <div className="findStores-search-group mt-12">
                        <div className="findStores-search-bar tc-1-small-regular">
                          {/* <input
                            type="text"
                            placeholder="搜尋關鍵字"
                            {...register('query')}
                            value={watchedQuery}
                          /> */}
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
                          <button
                            type="submit"
                            data-bs-dismiss="offcanvas"
                            data-bs-target="#searchOffcanvas"
                          >
                            <img src={Search} alt="imgAsideSearch" />
                          </button>
                        </div>
                        <div className="findStores-search-button">
                          <button type="button" onClick={onResetQueryOnly}>
                            重置
                          </button>
                        </div>
                      </div>
                    </div>
                    {/* <!-- 縣市 --> */}
                    <div className="city mb-36">
                      <span className="span-style">縣市</span>
                      <div className="mt-12 city-select">
                        <select
                          className="form-select form-select-lg select-arrow tc-1-small-regular"
                          aria-label=".form-select-lg example"
                          {...register('area')}
                        >
                          <option value="">全部縣市</option>
                          {AREA_OPTIONS.filter((a) => a !== '').map((a) => (
                            <option key={a} value={a}>
                              {a}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    {/* <!-- 鄉鎮市區 --> */}
                    {/* 暫時隱藏 因邏輯還沒有這一塊 */}
                    {/* <div className="township mb-36">
                    <span className="span-style">鄉鎮地區</span>
                    <div className="mt-12 township-select">
                      <select
                        className="form-select form-select-lg select-arrow"
                        aria-label=".form-select-lg example"
                      >
                        <option selected>請選擇鄉鎮地區</option>
                        <option value="1">大同區</option>
                        <option value="2">神岡區</option>
                        <option value="3">三民區</option>
                      </select>
                    </div>
                  </div> */}
                    {/* <!-- 店家種類 --> */}
                    <div className="storeTypes mb-36">
                      <span className="span-style">店家種類</span>
                      <div className="mt-12">
                        {STORE_TYPE_OPTIONS.map((type, index) => {
                          const isChecked = watchedStoreTypes.includes(type);
                          return (
                            <div
                              className={`mt-${index === 0 ? '0' : '12'} store-type-checkbox ${isChecked ? 'checked' : ''} `}
                              key={type}
                            >
                              <div className="form-check">
                                <input
                                  className="form-check-input checkbox-input"
                                  type="checkbox"
                                  value={type}
                                  id={`storeType-${type}`}
                                  {...register('storeType')}
                                />
                                <label
                                  className="form-check-label checkbox-label"
                                  htmlFor={`storeType-${type}`}
                                >
                                  {type}
                                </label>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    {/* <!-- 寵物種類 --> */}
                    <div className="petTypes mb-36">
                      <span className="span-style">寵物種類</span>
                      <div className="mt-12">
                        {PET_TYPE_OPTIONS.map((type, index) => {
                          const isChecked = watchedPetTypes.includes(type);
                          return (
                            <div
                              className={`mt-${index === 0 ? '0' : '12'} pet-type-checkbox ${isChecked ? 'checked' : ''}`}
                              key={type}
                            >
                              <div className="form-check ">
                                <input
                                  className="form-check-input checkbox-input"
                                  type="checkbox"
                                  value={type}
                                  id={`petType-${type}`}
                                  {...register('petType')}
                                />
                                <label
                                  className="form-check-label checkbox-label"
                                  htmlFor={`petType-${type}`}
                                >
                                  {type}
                                </label>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    {/* <!-- 搜尋按鈕 --> */}
                    <div className="findStores-search-btn">
                      <button
                        type="submit"
                        data-bs-dismiss="offcanvas"
                        data-bs-target="#searchOffcanvas"
                      >
                        搜尋
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </aside>
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

export default Favorite;
