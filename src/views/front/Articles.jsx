// 稀寵資訊 分頁

import ArticlesHero from '../../components/subHero/ArticlesHero';
import SubHero from '../../components/subHero/SubHero';
import { ChevronLeft, ChevronRight } from 'react-feather';

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


export default function Articles() {

  const articlesData = [
    {
      id: 1,
      title: "柯爾鴨​突然​腳軟、​站​不​穩？​你​可能​忘​了​補充​「這個」！​",
      category: "稀寵資訊",
      summary: "鴨子​腿軟​通常​是​缺乏​維生素​ B 群​或​鈣質。​本篇​整理​新​手飼​主必備​的​ 3​ 種營養補​充品​清單​與​正​確​餵食...",
      content: "",
      image: callDuckInfoA,
      date: "2024-03-15",
      author: "鴨鴨訓練師 小白"
    },
    {
      id: 2,
      title: "刺蝟​能​不​能​喝牛奶？​10 種絕對​不​能​餵​的​「禁忌​食物」​​",
      category: "稀寵資訊",
      summary: "刺蝟​有​乳糖​不​耐症，​喝牛​奶會腹瀉！​還​有​葡萄、​酪梨​等​看似​健康​的​蔬果，​其實​對刺蝟​有​毒性，​千萬​別​亂餵。​",
      content: "",
      image: hedgehogInfoA,
      date: "2025-03-15",
      author: "獸醫 Dr. Wu"
    },
    {
      id: 3,
      title: "【爬蟲市​集】​稀寵​搜搜 x 兩棲爬蟲博​覽會，​本週​末南​港​展覽​館見​​",
      category: "活動資訊",
      summary: "匯集​全​台​ 50 家​合法​爬蟲賣家​與週邊​商品，​現場還​有​免​費健檢服務。​憑本站​會員​畫​面入，​再​送精...​",
      content: "",
      image: gekkotaInfoA,
      date: "2026-03-15",
      author: "爬蟲專家 Leo"
    },
    {
      id: 4,
      title: "假冒​「動保處」​簡訊​通知​寵物​登記​異常？​千萬別點連結！​​​",
      category: "防詐資訊",
      summary: "匯集​全​台​ 50 家​合法​爬蟲賣家​與週邊​商品，​現場還​有​免​費健檢服務。​憑本站​會員​畫​面入，​再​送精...​",
      content: "",
      image: ScamInfoA,
      date: "2026-03-15",
      author: "爬蟲專家 Leo"
    },
    {
      id: 5,
      title: "網購柯​爾​鴨蛋​一顆​只要​ 500​ 元？​小心買​到​普通​的​「菜​鴨蛋」！​​",
      category: "防詐資訊",
      summary: "臉​書​出現​大量​冒​名​知名​鴨舍​的​假粉專，​盜用​照片​並​以​市價​ 1 折誘騙​匯款。​正規​繁殖場​不​會​要求​私下...​",
      content: "",
      image: ScamInfoB,
      date: "2026-01-10",
      author: "鴨鴨訓練師 小白"
    },
    {
      id: 6,
      title: "【鴨友聚會​】2025 聖​誕節​「百鴨​遊行」​將​在​大安森林​公園​登場！​​​",
      category: "活動資訊",
      summary: "一年​一度​的​柯爾​鴨​大型​聚會來​了！​現場​有​聖誕​變裝​比賽與鴨鴨​賽跑，​歡迎​帶​家裡​的​寶貝​一起​來交朋友...​",
      content: "",
      image: callDuckInfoB,
      date: "2026-03-10",
      author: "鴨鴨訓練師 小白"
    },
    {
      id: 7,
      title: "「免​費領養」​名​種龜？​小心​是​假送養、​真詐​運​費！​​​",
      category: "防詐資訊",
      summary: "詐騙者​聲稱​因出國急​需​送養，​只​需付​「空運費」​或​「籠子​錢」。​一旦​匯款後，​對方​就​會​以​海關​卡關...​",
      content: "",
      image: tortoiseInfoA,
      date: "2025-08-20",
      author: "爬蟲專家 Leo"
    },
    {
      id: 8,
      title: "賣家​注意！​買家​謊稱​「無法​下單」​要​你​掃 QR Code 簽署​協議？​​",
      category: "防詐資訊",
      summary: "這​是​新型​態詐騙！​詐騙​集團​假冒平​台​客服，​謊稱​賣場​被​凍結，​誘導​賣家​掃碼並​輸入​銀行​驗​證碼，​請勿​上當...​",
      content: "",
      image: ScamInfoC,
      date: "2025-09-16",
      author: "小寵達人 Miffy"
    },
    {
      id: 9,
      title: "寒流來襲！​蘇卡達陸龜​的​「保溫燈」​瓦數​該怎​麼挑？​​​",
      category: "稀寵資訊",
      summary: "台灣​冬天​濕冷，​對陸龜​是​致命傷。​別​只​看​溫度​計，​燈泡​距離與飼養箱​通風​也​是​關鍵，​教​你​打造...​",
      content: "",
      image: tortoiseInfoC,
      date: "2025-09-16",
      author: "小寵達人 Miffy"
    },
  ] 
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
            {articlesData.map(item=>{
              return(<>
              <div className="col-6 col-lg-4" data-type="anti-scam" key={item.id}>
              <article className="rp-article-card">
                <div className="rp-article-media">
                  <span className="rp-article-tag bg-warning">{item.category}</span>
                  <img
                    src={item.image}
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
              </>)
            })}
          </div>
        </div>
      </section>
      {/* <!-- 頁碼區 --> */}  
      <div className='container text-center '>
        <button 
        class="ui-pagination__item ui-pagination__item--prev is-disabled me-3"
        aria-label="Previous page"><ChevronLeft /></button>

        <button class="ui-pagination__item is-active me-3">1</button>
        {/* <button class="ui-pagination__item" aria-current="page">2</button>
        <button class="ui-pagination__item">3</button> */}

        <button 
        class="ui-pagination__item ui-pagination__item--next is-disabled"
        aria-label="Next page"><ChevronRight /></button>
      
      
      </div>   
    </>
  );
}
