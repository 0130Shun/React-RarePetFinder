export default function RarePetFinder() {
  return (
    <>
      <section class='ui-section ui-section--light'>
        <div class='ui-subHero' data-watermark='Results Info'>
          <div class='ui-container ui-subHero__layout'>
            <div class='ui-subHero__content'>
              <h1>柯爾鴨精品休閒館-台中店</h1>
              <div class='ui-subHero__meta'>
                <div class='ui-subHero__meta-group'>
                  <span class='ui-subHero__meta-item'>
                    <i data-feather='heart'></i> 153
                  </span>
                  <span class='ui-subHero__meta-divider'>|</span>
                  <span class='ui-subHero__meta-item'>10 則評論</span>
                </div>
                <div class='ui-subHero__meta-group'>
                  <span class='ui-subHero__meta-item'>
                    <i data-feather='home'></i> 旅館
                  </span>
                  <span class='ui-subHero__meta-item'>
                    <i data-feather='shopping-bag'></i> 賣家
                  </span>
                  <span class='ui-subHero__meta-item'>
                    <i data-feather='plus-square'></i> 診所
                  </span>
                </div>
              </div>
            </div>
            <div class='ui-subHero__aside shadow-sm row'>
              <p> 可接待的寵物：</p>
              <p> 🐁 倉鼠、🦆 柯爾鴨、🐢 烏龜、🦔 刺蝟</p>
            </div>
          </div>
          <div class='ui-subHero__breadcrumb ui-container'>
            <nav class='ui-breadcrumb'>
              <a href='#'>首頁</a>
              <i data-feather='chevron-right'></i>
              <span class='ui-breadcrumb__item'>搜尋頁面結果</span>
              <i data-feather='chevron-right'></i>
              <span class='ui-breadcrumb__item is-current'>店家資訊</span>
            </nav>
          </div>
        </div>
      </section>
      <h1>檢索頁面</h1>
    </>
  );
}
