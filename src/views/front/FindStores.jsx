import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form'; // 引入 RHF
import { useSelector } from 'react-redux';
import { ChevronLeft, ChevronRight } from 'react-feather';

// assets
import Sliders from '@/assets/img/sliders.png';
import Search from '@/assets/img/search.svg';
// constants
import {
  AREA_OPTIONS_NO_EMPTY,
  STORE_TYPE_OPTIONS,
  PET_TYPE_OPTIONS,
  DEFAULT_FILTERS,
} from '@/constants/storeOptions';

// services
import { storeService } from '@/services/storeService'; // 更新抽出後的api路徑
import { getFavoritesApi } from '@/services/favoriteService'; // 取得user的favorite的api路徑
//components
import SubHero from '@/components/subHero/SubHero';
import FullPageLoader from '@/components/shared/FullPageLoader';
import StoreCard from '@/components/StoreCard.jsx';
// hook
import { useFavorite } from '@/hook/useFavorite';
// utils
import { buildSearchParams } from '@/utils/storeSearchUtils';
import { processSearch } from '@/utils/storeFilterUtils';

// 暫時不抽出元件，因為對這部分的scss和設計不熟悉
const FindStores = () => {
  const [searchParams, setSearchParams] = useSearchParams(); //更新網址用(query params)
  // 一行搞定初始化，defaultValues 對應原本的 initialState
  const { register, handleSubmit, setValue, reset, watch, control } = useForm({
    defaultValues: { ...DEFAULT_FILTERS },
  });
  // 已套用到結果的條件
  const [filters, setFilters] = useState({
    ...DEFAULT_FILTERS,
    page: 1,
  });
  const watchedPetTypes = watch('petType') || [];
  const watchedStoreTypes = watch('storeType') || [];
  // const watchedQuery = watch('query') || '';
  const [allStores, setAllStores] = useState([]); //從 API 抓回來的「全部店家」
  const [items, setItems] = useState([]); //目前頁面要顯示的那 9 筆
  const [totalPages, setTotalPages] = useState(1); //用篩選後的總筆數 / PAGE_SIZE 算出來
  const [totalCount, setTotalCount] = useState(0); // 用來存篩選後的總筆數

  const [favoritesMap, setFavoritesMap] = useState({}); // 用來存篩以登入的user的favoritesMap狀態，運作起來會類似這樣變成清單比對  => favoritesMap = {

  // 介面狀態
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const user = useSelector((state) => state.user.user); // 從state取出會員資料
  const { toggleFavorite } = useFavorite(user, favoritesMap, setFavoritesMap);

  // 從storeService載入api工具getAllStores()：第一次載入抓資料「全部店家」
  useEffect(() => {
    let mounted = true;

    async function load() {
      setIsLoading(true);
      setError(null);
      try {
        // 讓 loading 至少顯示 500ms（模擬載入中狀態500秒，實際上可以拿掉)
        await new Promise((r) => setTimeout(r, 1000));

        const data = await storeService.getAllStores();
        setAllStores(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        if (!mounted) return;
        setError('載入店家資料失敗，請確認 json-server-api網站 是否已啟動');
        setAllStores([]);
      } finally {
        if (mounted) setIsLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, []);

  // 抓 favorites（只在登入時）
  useEffect(() => {
    if (!user) {
      // user logout時，清掉 favorite
      setFavoritesMap({});
      return;
    }

    const loadFavorites = async () => {
      const favs = await getFavoritesApi(user.id);

      const map = {};
      favs.forEach((f) => {
        map[f.storeId] = f.id;
      });

      setFavoritesMap(map);
    };

    loadFavorites();
  }, [user]);

  // useEffect 抽出 applyFilters、 paginate、 processSearch()
  // URL 或資料變了，就重新算結果 => 改寫成 async/await 版本，並加入 isLoading 和 error 狀態
  useEffect(() => {
    let active = true;

    const runSearch = () => {
      setIsLoading(true);

      const result = processSearch(searchParams, allStores);

      if (!active) return;
      // state狀態集中處理
      setItems(result.items);
      setTotalCount(result.total);
      setTotalPages(result.totalPages);
      reset(result.nextFilters);
      setFilters(result.nextFilters);
    };

    runSearch();

    const timer = setTimeout(() => {
      if (active) setIsLoading(false);
    }, 400);

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [searchParams, allStores, reset]);

  // RHF 轉換後的寫法-> RHF 的 submit：它會自動把收集好的 data (也就是原本的 draft) 傳給你
  const onSubmitSearch = (data) => {
    const params = buildSearchParams({ ...data, page: 1 });
    setSearchParams(params);
  };
  // RHF 的清空：用 setValue 指定欄位改值
  const onResetQueryOnly = () => {
    setValue('query', '');
    const nextFilters = { ...filters, query: '', page: 1 };
    setSearchParams(buildSearchParams(nextFilters));
  };

  // 換頁
  const goToPage = (page) => {
    const next = { ...filters, page };
    setSearchParams(buildSearchParams(next));
  };

  return (
    <>
      <SubHero variant="findStores" />
      <div className="container ui-container mt-md-5">
        <div className="row mx-0 mx-md-auto">
          <div className="d-lg-none p-3">
            <div className="findStores-search mb-36 mobile-search">
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
            </div>
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
                          {/* {AREA_OPTIONS.filter((a) => a !== '').map((a) => (
                            <option key={a} value={a}>
                              {a}
                            </option>
                          ))} */}
                          {AREA_OPTIONS_NO_EMPTY.map((a) => (
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
            <span className="findStores-searchResults text-center text-lg-start">
              搜尋結果
            </span>
            {/* 顯示目前筆數/總筆數 */}
            <span className="text-muted small">共 {totalCount} 筆</span>
            {/* Loading / Error 狀態顯示 */}
            {isLoading && <div className="py-5 text-center">載入中...</div>}
            {error && (
              <div className="py-5 text-center text-danger">{error}</div>
            )}
            {!isLoading && !error && items.length === 0 && (
              <div className="py-5 text-center text-muted">
                找不到符合條件的店家，請嘗試放寬篩選條件。
              </div>
            )}
            {/* 卡片列表 */}
            <div className="row mx-0 mx-md-auto  g-3 mt-16">
              {items.map((store) => {
                // const isFavorite = favoritesMap[store.id];
                const isFavorite = !!favoritesMap[store.id]; // 避免 undefined bug
                return (
                  <StoreCard
                    key={store.id}
                    store={store}
                    // isFavorite={!!favoritesMap[store.id]}
                    isFavorite={isFavorite}
                    onToggleFavorite={toggleFavorite}
                  />
                );
              })}
            </div>
            {/* 分頁 (Pagination) */}
            {totalPages > 1 && (
              <nav
                className="ui-pagination justify-content-center mt-5 d-flex gap-2"
                aria-label="Pagination"
              >
                <button
                  className="ui-pagination__item ui-pagination__item--prev "
                  aria-label="Previous page"
                  disabled={filters.page <= 1}
                  onClick={() => goToPage(filters.page - 1)}
                >
                  <ChevronLeft />
                </button>

                {/* 簡單版：只顯示當前頁面，如果要像 UI 一樣顯示 1, 2, 3 需要寫額外邏輯產生陣列 */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (pageNum) => (
                    <button
                      key={pageNum}
                      className={`ui-pagination__item btn btn-sm ${filters.page === pageNum ? 'is-active btn-primary' : 'btn-outline-light text-dark'}`}
                      onClick={() => goToPage(pageNum)}
                    >
                      {pageNum}
                    </button>
                  )
                )}

                <button
                  className="ui-pagination__item ui-pagination__item--next "
                  aria-label="Next page"
                  disabled={filters.page >= totalPages}
                  onClick={() => goToPage(filters.page + 1)}
                >
                  <ChevronRight />
                </button>
              </nav>
            )}
          </main>
        </div>
      </div>
      {/* ScreenLoading */}
      <FullPageLoader show={isLoading} zIndex={2000} />
    </>
  );
};

export default FindStores;
