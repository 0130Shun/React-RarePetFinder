// 稀寵資訊 分頁

import SubHero from '@/components/subHero/SubHero';
import FullPageLoader from '@/components/shared/FullPageLoader';
import { ChevronLeft, ChevronRight } from 'react-feather';
import { useEffect, useState, useMemo } from 'react';
import { storeService } from '@/api';
import useResponsivePageSize from '@/hook/useResponsivePageSize';
import { Link } from 'react-router-dom';

//引入圖片
import callDuckInfoA from '@/assets/img/articlesImg/articlesId01.png';
import hedgehogInfoA from '@/assets/img/articlesImg/articlesId02.png';
import gekkotaInfoA from '@/assets/img/articlesImg/articlesId03.png';
import ScamInfoA from '@/assets/img/articlesImg/articlesId04.jpg';
import ScamInfoB from '@/assets/img/articlesImg/articlesId05.png';
import callDuckInfoB from '@/assets/img/articlesImg/articlesId06.png';
import tortoiseInfoA from '@/assets/img/articlesImg/articlesId07.png';
import ScamInfoC from '@/assets/img/articlesImg/articlesId08.png';
import tortoiseInfoC from '@/assets/img/articlesImg/articlesId09.png';
import articlesId10 from '@/assets/img/articlesImg/articlesId10.png';
import articlesId11 from '@/assets/img/articlesImg/articlesId11.png';
import articlesId12 from '@/assets/img/articlesImg/articlesId12.png';
import articlesId13 from '@/assets/img/articlesImg/articlesId13.png';
import articlesId14 from '@/assets/img/articlesImg/articlesId14.png';
import articlesId15 from '@/assets/img/articlesImg/articlesId15.png';
import articlesId16 from '@/assets/img/articlesImg/articlesId16.png';
import articlesId17 from '@/assets/img/articlesImg/articlesId17.png';
import articlesId18 from '@/assets/img/articlesImg/articlesId18.png';
import articlesId19 from '@/assets/img/articlesImg/articlesId19.png';

//把json data字串轉成變數
const imageMap = {
  callDuckInfoA,
  hedgehogInfoA,
  gekkotaInfoA,
  ScamInfoA,
  ScamInfoB,
  callDuckInfoB,
  tortoiseInfoA,
  ScamInfoC,
  tortoiseInfoC,
  articlesId10,
  articlesId11,
  articlesId12,
  articlesId13,
  articlesId14,
  articlesId15,
  articlesId16,
  articlesId17,
  articlesId18,
  articlesId19,
};

//const PAGE_SIZE =  useResponsivePageSize();

const CATEGORY_MAP = {
  all: null,
  rare: '稀寵資訊',
  event: '活動資訊',
  anti: '防詐資訊',
};

export default function Articles() {
  const pageSize = useResponsivePageSize();
  const [allArticles, setAllArticles] = useState([]); //從 API 抓回來的「全部店家」

  const [activeCategory, setActiveCategory] = useState('all');
  const [page, setPage] = useState(1);

  //介面狀態
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // 從storeService載入api工具getAllArticles()：第一次載入抓資料「全部文章」
  useEffect(() => {
    let mounted = true;

    async function load() {
      setIsLoading(true);
      setError(null);
      try {
        // 讓 本頁的 loading 至少顯示 500ms（模擬載入中狀態500秒，實際上可以拿掉)
        await new Promise((r) => setTimeout(r, 1000));

        const data = await storeService.getAllArticles();
        if (!mounted) return;
        setAllArticles(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        if (!mounted) return;
        setError('載入資料失敗，請確認 json-server 是否已啟動');
        setAllArticles([]);
      } finally {
        if (mounted) setIsLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, []);

  // 1) 先過濾出「該分類的清單」
  const filteredArticles = useMemo(() => {
    const target = CATEGORY_MAP[activeCategory]; // null 代表 all
    if (!target) return allArticles;
    return allArticles.filter((a) => a.category === target);
  }, [allArticles, activeCategory]);

  // 2) 再算頁數、再切出「當頁要顯示的」
  const totalPages = Math.max(1, Math.ceil(filteredArticles.length / pageSize));

  const safePage = Math.min(page, totalPages); // 防呆

  const pageArticles = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return filteredArticles.slice(start, start + pageSize);
  }, [filteredArticles, safePage, pageSize]);

  // 切分類：更新分類 + 頁碼回到 1
  const handleCategoryClick = (nextKey) => {
    setActiveCategory(nextKey);
    setPage(1);
  };

  const goPrev = () => setPage((p) => Math.max(1, p - 1));
  const goNext = () => setPage((p) => Math.min(totalPages, p + 1));

  //保留舊版面寫法：切換頁碼時，滾動到頂部
  // useEffect(() => {
  //   window.scrollTo({
  //     top: 0,
  //     behavior: 'auto',
  //   });
  // }, [page]);
  //async await + setTimeout 模擬實際api資料載入中狀態，實際上可以拿掉
  // useEffect(() => {
  //   let active = true;
  //   async function handlePageChange() {
  //     setIsLoading(true);
  //     window.scrollTo({ top: 0, behavior: 'auto' });
  //     await new Promise((r) => setTimeout(r, 300));
  //     if (active) setIsLoading(false);
  //   }
  //   handlePageChange();
  //   return () => {
  //     active = false;
  //   };
  // }, [page]);

  //async await 拿掉寫法
  useEffect(() => {
    setIsLoading(true);
    window.scrollTo({
      top: 0,
      behavior: 'auto',
    });

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [page]);

  return (
    <>
      {/* <ArticlesHero /> */}
      <SubHero variant="articles" />
      <section className="rarepet-info-section pt-1 pb-5 mt-5">
        <div className="container pb-5">
          {/* 切換按鈕 */}
          <div className="row justify-content-center g-2 g-lg-3 mb-4">
            {[
              ['all', '全部'],
              ['rare', '稀寵資訊'],
              ['event', '活動資訊'],
              ['anti', '防詐資訊'],
            ].map(([key, label]) => (
              <div className="col-6 col-lg-auto text-center" key={key}>
                <button
                  className={`rp-filter-btn ${activeCategory === key ? 'active' : ''}`}
                  type="button"
                  onClick={() => handleCategoryClick(key)}
                >
                  {label}
                </button>
              </div>
            ))}
          </div>

          {/* 狀態 */}
          {isLoading && <p className="text-center">載入中...</p>}
          {error && <p className="text-center text-danger">{error}</p>}

          {/* 卡片列表 */}
          {!isLoading && !error && (
            <>
              <div className="row g-3 g-md-4">
                {pageArticles.map((item) => (
                  <div className="col-6 col-lg-4" key={item.id}>
                    <article className="rp-article-card">
                      <div className="rp-article-media">
                        <span className="rp-article-tag bg-warning">
                          {item.category}
                        </span>
                        <img
                          src={imageMap[item.image]}
                          alt={item.title}
                          className="rp-article-img"
                        />
                      </div>

                      <div className="rp-article-body">
                        <p className="rp-article-date">{item.date}</p>
                        <h3 className="rp-article-title">{item.title}</h3>
                        <p className="rp-article-desc">{item.summary}</p>
                        <Link
                          className="rp-article-link $ui-blue-700"
                          to="/articles"
                        >
                          繼續閱讀
                        </Link>
                      </div>
                    </article>
                  </div>
                ))}
              </div>

              {/* 分頁 (Pagination) */}
              {totalPages > 1 && (
                <nav
                  className="ui-pagination d-flex justify-content-center mt-5 gap-3"
                  aria-label="Pagination"
                >
                  {/* 上一頁 */}
                  <button
                    type="button"
                    className="ui-pagination__item ui-pagination__item--prev"
                    aria-label="Previous page"
                    disabled={page <= 1}
                    onClick={goPrev}
                  >
                    <ChevronLeft />
                  </button>

                  {/* 頁碼 */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (pageNum) => (
                      <button
                        key={pageNum}
                        type="button"
                        className={`ui-pagination__item ${
                          page === pageNum ? 'is-active' : ''
                        }`}
                        onClick={() => setPage(pageNum)}
                      >
                        {pageNum}
                      </button>
                    )
                  )}

                  {/* 下一頁 */}
                  <button
                    type="button"
                    className="ui-pagination__item ui-pagination__item--next"
                    aria-label="Next page"
                    disabled={page >= totalPages}
                    onClick={goNext}
                  >
                    <ChevronRight />
                  </button>
                </nav>
              )}
            </>
          )}
        </div>
      </section>
      {isLoading && (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(255,255,255,0.3)',
            zIndex: 999,
          }}
        >
          <FullPageLoader show={isLoading} />
        </div>
      )}
    </>
  );
}
