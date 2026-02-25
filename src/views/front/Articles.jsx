// 稀寵資訊 分頁

import ArticlesHero from '../../components/subHero/ArticlesHero';
import SubHero from '../../components/subHero/SubHero';
import { ChevronLeft, ChevronRight } from 'react-feather';
import { useEffect,useState } from 'react';
import { storeService } from '@/api'; 

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
  articlesId19
};


const PAGE_SIZE = 9;

export default function Articles() {

  const [allAeticles, setAllAeticles] = useState([]); //從 API 抓回來的「全部店家」
 
 //介面狀態
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

   // 從storeService載入api工具getAllArticles()：第一次載入抓資料「全部文章」
  useEffect(()=>{
let mounted = true;

    async function load() {
      setIsLoading(true);
      setError(null);
      try {
        const data = await storeService.getAllArticles();
        setAllAeticles(Array.isArray(data) ? data : []);
        console.log('檢查',allAeticles);
      } catch (err) {
        console.error(err);
        if (!mounted) return;
        setError(
          '載入資料失敗，請確認 json-server 是否已啟動'
        );
        setAllAeticles([]);
      } finally {
        if (mounted) setIsLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  },[])

  return (
    <>
      {/* <ArticlesHero /> */}
      <SubHero variant="articles" />

      {/* 主要內容 */}
      <section className="rarepet-info-section pt-1 pb-5 mt-5">
        <div className="container pb-5 ">
          {/* <!-- 切換按鈕 --> */}
          <div className="row justify-content-center g-2 g-lg-3 mb-4">
            <div className="col-6 col-lg-auto text-center">
              <button className="rp-filter-btn active" data-filter="all">
                全部
              </button>
            </div>
            <div className="col-6 col-lg-auto text-center">
              <button className="rp-filter-btn" data-filter="rare">
                稀寵資訊
              </button>
            </div>
            <div className="col-6 col-lg-auto text-center">
              <button className="rp-filter-btn" data-filter="event">
                活動資訊
              </button>
            </div>
            <div className="col-6 col-lg-auto text-center">
              <button className="rp-filter-btn" data-filter="anti">
                防詐資訊
              </button>
            </div>
          </div>
          {/* <!-- 卡片列表 Grid -->*/}
          <div className="row g-3 g-md-4">
            {allAeticles.map(item=>{
              return(
              <div className="col-6 col-lg-4" data-type="anti-scam" key={item.id}>
              <article className="rp-article-card">
                <div className="rp-article-media">
                  <span className="rp-article-tag bg-warning">{item.category}</span>
                  <img
                    src={imageMap[item.image]}
                    alt={item.title}
                    className="rp-article-img"
                  />
                </div>

                <div className="rp-article-body">
                  <p className="rp-article-date">{item.date}</p>
                  <h3 className="rp-article-title">
                    {item.title}
                  </h3>
                  <p className="rp-article-desc">
                    {item.summary}
                  </p>
                  <a href="#" className="rp-article-link $ui-blue-700">
                    繼續閱讀
                  </a>
                </div>
              </article>
            </div>
              )
            })}
          </div>
        </div>
      </section>
      {/* <!-- 頁碼區 --> */}  
      <div className='container text-center '>
        <button 
        className="ui-pagination__item ui-pagination__item--prev is-disabled me-3"
        aria-label="Previous page"><ChevronLeft /></button>

        <button className="ui-pagination__item is-active me-3">1</button>

        <button 
        className="ui-pagination__item ui-pagination__item--next is-disabled"
        aria-label="Next page"><ChevronRight /></button>
      
      
      </div>   
    </>
  );
}


//分類按鈕 
// const btnCategory = [
//   {
//     btn:"全部",
//     id:1,
//     active:true
// },
// {
//     btn:"稀寵資訊",
//     id:2,
//     active:false
// },
// {
//     btn:"活動資訊",
//     id:3,
//     active:false
// },
// {
//     btn:"防詐資訊",
//     id:4,
//     active:false
// },
// ]