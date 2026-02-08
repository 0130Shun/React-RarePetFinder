import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form'; // 引入 RHF
import { storeService } from '../../api'; // 稀寵搜搜專題的api入口

//檢索頁的Banner
// import BannerForFindStores from '../../components/BannerForFindStores';
import FindStoresHero from '../../components/FindStoresHero';

// 將 storeSearchUtils 中的工具引入
import {
  parseFilters,
  buildSearchParams,
  hasIntersection,
  matchQuery,
} from '@/utils/storeSearchUtils';

//每頁顯示 9 筆店家
const PAGE_SIZE = 9;

export default function FindStores() {
  const [searchParams, setSearchParams] = useSearchParams(); //更新網址用(query params)
  // 一行搞定初始化，defaultValues 對應原本的 initialState
  const { register, handleSubmit, setValue, reset, watch } = useForm({
    defaultValues: {
      area: '',
      query: '',
      storeType: [], // RHF 會自動把多選 checkbox 處理成陣列
      petType: [],
    },
  });
  // 已套用到結果的條件
  const [filters, setFilters] = useState({
    area: '',
    query: '',
    storeType: [],
    petType: [],
    page: 1,
  });

  const [allStores, setAllStores] = useState([]); //從 API 抓回來的「全部店家」
  const [items, setItems] = useState([]); //目前頁面要顯示的那 9 筆
  const [totalPages, setTotalPages] = useState(1); //用篩選後的總筆數 / PAGE_SIZE 算出來

  //介面狀態
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  //select/checkbox 會用到的選項
  const AREA_OPTIONS = useMemo(
    () => [
      '',
      '新北',
      '台北',
      '桃園',
      '高雄',
      '台中',
      '台南',
      '嘉義',
      '新竹',
      '屏東',
    ],
    []
  );
  const STORE_TYPE_OPTIONS = useMemo(() => ['診所', '旅館', '賣家'], []);
  const PET_TYPE_OPTIONS = useMemo(
    () => ['柯爾鴨', '鸚鵡', '倉鼠', '烏龜', '守宮', '刺蝟'],
    []
  );

  // 從storeService載入api工具getAllStores()：第一次載入抓資料「全部店家」
  useEffect(() => {
    let mounted = true;

    async function load() {
      setIsLoading(true);
      setError(null);
      try {
        const data = await storeService.getAllStores();
        setAllStores(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        if (!mounted) return;
        setError(
          '載入店家資料失敗，請確認 json-server 是否已啟動 (localhost:3001)'
        );
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

  // URL 或資料變了，就重新算結果
  useEffect(() => {
    const nextFilters = parseFilters(searchParams);

    //如果重新整理或貼上連結，也會顯示打勾等等對應的選項
    // 用 RHF 的 reset 取代原本的 setDraft
    reset({
      area: nextFilters.area,
      query: nextFilters.query,
      storeType: nextFilters.storeType,
      petType: nextFilters.petType,
    });

    // URL → filters 套用
    setFilters(nextFilters);

    // 篩選流程
    // 地區
    const areaFiltered =
      nextFilters.area === ''
        ? allStores
        : allStores.filter((s) => s.area === nextFilters.area);
    // 關鍵字
    const queryFiltered = areaFiltered.filter((s) =>
      matchQuery(s, nextFilters.query)
    );
    // 店家
    const storeTypeFiltered = queryFiltered.filter((s) =>
      hasIntersection(
        Array.isArray(s.type) ? s.type : [],
        nextFilters.storeType
      )
    );
    //寵物
    const filtered = storeTypeFiltered.filter((s) =>
      hasIntersection(
        Array.isArray(s.petTypes) ? s.petTypes : [],
        nextFilters.petType
      )
    );

    // 分頁
    const nextTotalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    setTotalPages(nextTotalPages);

    const safePage = Math.min(Math.max(1, nextFilters.page), nextTotalPages);
    if (safePage !== nextFilters.page) {
      const fixed = { ...nextFilters, page: safePage };
      setSearchParams(buildSearchParams(fixed), { replace: true });
      return;
    }

    const start = (safePage - 1) * PAGE_SIZE;
    setItems(filtered.slice(start, start + PAGE_SIZE));
  }, [searchParams, allStores, setSearchParams, reset]); //記得依賴加入 reset

  // RHF 轉換後的寫法-> RHF 的 submit：它會自動把收集好的 data (也就是原本的 draft) 傳給你
  const onSubmitSearch = (data) => {
    const params = buildSearchParams({ ...data, page: 1 });
    setSearchParams(params);
  };
  // RHF 的清空：用 setValue 指定欄位改值
  const onResetQueryOnly = () => {
    setValue('query', '');
  };

  // 換頁
  const goToPage = (page) => {
    const next = { ...filters, page };
    setSearchParams(buildSearchParams(next));
  };

  //載入時和載入失敗時會顯示的畫面，之後切版的東西進來可以考慮轉成元件
  if (isLoading) return <p>載入中...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      {/* <BannerForFindStores /> */}
      <FindStoresHero />
      <br />
      <h1>店家檢索（按搜尋才更新）</h1>

      <form
        style={{ margin: '16px 0', display: 'grid', gap: 12 }}
        onSubmit={handleSubmit(onSubmitSearch)}
      >
        <div>
          <label style={{ marginRight: 8 }}>縣市：</label>
          <select {...register('area')}>
            {AREA_OPTIONS.map((a) => (
              <option key={a || 'all'} value={a}>
                {a === '' ? '全部縣市' : a}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ marginRight: 8 }}>關鍵字：</label>
          <input
            {...register('query')}
            placeholder="例如：柯爾鴨 / 旅館 / 淡水"
          />
          <button
            type="button"
            onClick={onResetQueryOnly}
            style={{ marginLeft: 8 }}
          >
            清空關鍵字
          </button>
        </div>

        <div>
          <div style={{ fontWeight: 600, marginBottom: 6 }}>
            店家種類（多選）
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {STORE_TYPE_OPTIONS.map((t) => (
              <label
                key={t}
                style={{ display: 'flex', gap: 6, alignItems: 'center' }}
              >
                <input type="checkbox" value={t} {...register('storeType')} />
                {t}
              </label>
            ))}
          </div>
        </div>

        <div>
          <div style={{ fontWeight: 600, marginBottom: 6 }}>
            寵物種類（多選）
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {PET_TYPE_OPTIONS.map((p) => (
              <label
                key={p}
                style={{ display: 'flex', gap: 6, alignItems: 'center' }}
              >
                <input type="checkbox" value={p} {...register('petType')} />
                {p}
              </label>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          <button type="submit">搜尋</button>
        </div>
      </form>

      <hr />

      {items.length === 0 ? (
        <p>找不到符合條件的店家</p>
      ) : (
        <>
          <h3>此頁店家：</h3>
          <ul>
            {items.map((store) => (
              <li key={store.id}>
                {store.storeName}（{store.area}）｜{store.type?.join(' / ')}｜
                {store.petTypes?.join(' / ')}
              </li>
            ))}
          </ul>

          <div
            style={{
              marginTop: 16,
              display: 'flex',
              gap: 12,
              alignItems: 'center',
            }}
          >
            <button
              disabled={filters.page <= 1}
              onClick={() => goToPage(filters.page - 1)}
            >
              上一頁
            </button>

            <span>
              第 {filters.page} / {totalPages} 頁
            </span>

            <button
              disabled={filters.page >= totalPages}
              onClick={() => goToPage(filters.page + 1)}
            >
              下一頁
            </button>
          </div>

          <hr />
          <h3>本頁資料（debug）：</h3>
          <pre>{JSON.stringify(items, null, 2)}</pre>
        </>
      )}
    </div>
  );
}
