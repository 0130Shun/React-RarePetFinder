export default function BannerForFindStores() {
  return (
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
  );
}
