export default function RarePetFinder() {
  return (
    <>
      <section class='ui-section ui-section--light'>
        <div class='ui-subHero' data-watermark='Search Results'>
          <div class='ui-container ui-subHero__layout'>
            <div class='ui-subHero__content'>
              <h1>你負責愛，我們負責搜</h1>
              <p>找寵物商店，就從這裡</p>
            </div>
            <div class='ui-subHero__aside shadow-sm'>
              <p> 吃的、洗的、住的、醫療一次找齊</p>
            </div>
          </div>
          <div class='ui-subHero__breadcrumb ui-container'>
            <nav class='ui-breadcrumb'>
              <a href='#'>首頁</a>
              <i data-feather='chevron-right'></i>
              <span class='ui-breadcrumb__item is-current'>搜尋結果</span>
            </nav>
          </div>
        </div>
      </section>
      <h1>檢索頁面</h1>
    </>
  );
}
