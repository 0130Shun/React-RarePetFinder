import { useEffect, useState } from 'react';
import { storeService } from '../../api'; // 引入你寫好的工具箱

export default function RarePetFinder() {
  // 狀態
  const [allStores, setAllStores] = useState([]); // 完整原始資料
  const [filteredStores, setFilteredStores] = useState([]); // 過濾後結果
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const ITEMS_PER_PAGE = 9;

  // 篩選條件
  const [area, setArea] = useState('');
  const [type, setType] = useState('');
  // const [petType, setPetType] = useState(''); // 之後再加
  // const [keyword, setKeyword] = useState(''); // 之後再加

  const areas = [
    '台北',
    '新北',
    '桃園',
    '新竹',
    '台中',
    '彰化',
    '嘉義',
    '台南',
    '高雄',
    '屏東',
  ];
  const types = ['診所', '旅館', '賣家'];

  // 重置功能
  const resetFilters = () => {
    setArea('');
    setType('');
    // setPetType('');
    // setKeyword('');
    setFilteredStores(allStores); // 直接重置顯示全部
    setCurrentPage(1);
  };

  // 第一次載入全部資料
  useEffect(() => {
    const loadAll = async () => {
      setLoading(true);
      try {
        const res = await storeService.getAllStores({ limit: 1000 }); // 載入全部
        setAllStores(res.data);
        setFilteredStores(res.data); // 一開始顯示全部
        setCurrentPage(1);
      } catch (err) {
        console.error('載入失敗', err);
        alert('載入失敗，請稍後再試');
      } finally {
        setLoading(false);
      }
    };
    loadAll();
  }, []);

  // 當篩選條件改變 → 重新過濾
  useEffect(() => {
    if (allStores.length === 0) return; // 避免初始空陣列觸發

    let result = [...allStores];

    // 地區
    if (area) {
      result = result.filter((item) => item.area === area);
    }

    // 店家類型（陣列包含）
    if (type) {
      result = result.filter(
        (item) => Array.isArray(item.type) && item.type.includes(type)
      );
    }
    // // 寵物類型（之後加）
    // if (petType) {
    //   result = result.filter(item =>
    //     Array.isArray(item.petTypes) && item.petTypes.includes(petType)
    //   );
    // }
    // // 關鍵字（之後加）
    // if (keyword.trim()) {
    //   const kw = keyword.trim().toLowerCase();
    //   result = result.filter(item => {
    //     const text = [
    //       item.storeName || '',
    //       item.description || '',
    //       item.phone || '',
    //       ...(item.type || []),
    //       ...(item.petTypes || []),
    //     ].join(' ').toLowerCase();
    //     return text.includes(kw);
    //   });
    // }

    setFilteredStores(result);
    setCurrentPage(1); // 自動回到第一頁
  }, [area, type, allStores]); // 之後加 [petType, keyword]
  // [area, type, petType, keyword, allStores];

  // 計算目前頁的 9 筆資料
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentPageItems = filteredStores.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredStores.length / ITEMS_PER_PAGE);

  // 搜尋按鈕（雖然 useEffect 會自動觸發，但保留給使用者按的感覺）
  const searchStores = () => {
    // 可以加一些驗證或動畫，但現在直接觸發 useEffect 就行
    // 如果想強制重新過濾，可以 setLoading 短暫顯示
  };

  return (
    <>
      <section className="ui-section ui-section--light">
        <div className="ui-subHero" data-watermark="Search Results">
          <div className="ui-container ui-subHero__layout">
            <div className="ui-subHero__content">
              <h1>你負責愛，我們負責搜</h1>
              <p>找寵物商店，就從這裡</p>
            </div>
            <div className="ui-subHero__aside shadow-sm">
              <p> 吃的、洗的、住的、醫療一次找齊</p>
            </div>
          </div>
          <div className="ui-subHero__breadcrumb ui-container">
            <nav className="ui-breadcrumb">
              <a href="#">首頁</a>
              <i data-feather="chevron-right"></i>
              <span className="ui-breadcrumb__item is-current">搜尋結果</span>
            </nav>
          </div>
        </div>
      </section>
      <h1>檢索頁面</h1>

      <div className="container my-4">
        <h2>找寵物相關店家</h2>

        <div className="row g-3 mb-4">
          <div className="col-12 col-md-3">
            <select
              className="form-select"
              value={area}
              onChange={(e) => setArea(e.target.value)}
            >
              <option value="">所有地區</option>
              {areas.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className="col-12 col-md-3">
            <select
              className="form-select"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="">所有類型</option>
              {types.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="col-12 col-md-6 d-flex gap-2">
            <button
              className="btn btn-primary flex-grow-1"
              onClick={searchStores}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  搜尋中...
                </>
              ) : (
                '搜尋'
              )}
            </button>
            <button
              className="btn btn-outline-secondary"
              onClick={resetFilters}
              disabled={loading}
            >
              重置 / 顯示全部
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status"></div>
            <p>載入中...</p>
          </div>
        ) : filteredStores.length === 0 ? (
          <div className="alert alert-info">
            沒有符合條件的店家 {area && `（地區：${area}）`}{' '}
            {type && `（類型：${type}）`}
          </div>
        ) : (
          <div>
            <p className="mb-3">
              找到 <strong>{filteredStores.length}</strong> 筆資料{' '}
              {area && <span>（地區：{area}）</span>}{' '}
              {type && <span>（類型：{type}）</span>}
            </p>

            <div className="row g-3">
              {currentPageItems.map((store) => (
                <div key={store.id} className="col-md-6 col-lg-4">
                  <div className="card h-100 shadow-sm">
                    <div className="card-body">
                      <h5 className="card-title">
                        {store.storeName || '未命名店家'}
                      </h5>
                      <p className="card-text text-muted">
                        {store.area} · {store.type?.join(', ') || '未知類型'}
                      </p>
                      <p className="card-text">
                        {store.description || '無描述資訊'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="d-flex justify-content-center mt-4 gap-2">
                <button
                  className="btn btn-outline-primary"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                >
                  上一頁
                </button>
                <span className="align-self-center">
                  第 {currentPage} / {totalPages} 頁
                </span>
                <button
                  className="btn btn-outline-primary"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => p + 1)}
                >
                  下一頁
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
