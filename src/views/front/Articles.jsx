
// 稀寵資訊 分頁
// import '.../scss/main.scss'
// import '../scss/pages/_articles.scss'

export default function Articles() {

    return (<>
        <h1>稀寵資訊專欄列表</h1>
    </>)
}

// { console.log('測試：console.log正常') }
// {/* 共用header */ }
// <header className="header ui-wrapper">
//     <nav className="navbar navbar-expand-lg bg-white">
//         <div className="container ui-container">
//             <a className="navbar-brand d-flex align-items-center" href="./index.html">
//                 <img src="../src/assets/logo.png" alt="稀寵搜尋.logo" height="32" className="me-2" />
//             </a>
//             <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav">
//                 <span className="navbar-toggler-icon"></span>
//             </button>
//             <div className="collapse navbar-collapse" id="mainNav">
//                 <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-2">
//                     <li className="nav-item dropdown ui-nav-item">
//                         <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
//                             搜尋頁
//                         </a>
//                         <ul className="dropdown-menu">
//                             <li><a className="dropdown-item" href="./index.html">找診所</a></li>
//                             <li><a className="dropdown-item" href="./index.html">找旅館</a></li>
//                             <li><a className="dropdown-item" href="./index.html">找賣家</a></li>
//                         </ul>
//                     </li>
//                     <li className="nav-item ui-nav-item">
//                         <a className="nav-link d-flex align-items-center" href="./index.html">
//                             <i className="bi bi-person-circle me-1"></i>
//                             稀寵資訊
//                         </a>
//                     </li>
//                     <li className="nav-item ui-nav-item">
//                         <a className="nav-link d-flex align-items-center" href="./index.html">
//                             <i className="bi bi-person-circle me-1"></i>
//                             投稿/回報
//                         </a>
//                     </li>
//                     <li className="nav-item dropdown ui-nav-item">
//                         <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
//                             登入/註冊
//                         </a>
//                         <ul className="dropdown-menu">
//                             <li><a className="dropdown-item" href="./index.html">登入會員</a></li>
//                             <li><a className="dropdown-item" href="./index.html">註冊會員</a></li>
//                         </ul>
//                     </li>
//                     <li className="nav-item ui-nav-item">
//                         <a className="nav-link d-flex align-items-center" href="./index.html">
//                             <i className="bi bi-person-circle me-1"></i>
//                             會員中心
//                         </a>
//                     </li>

//                 </ul>
//             </div>
//         </div>
//     </nav>
// </header>
// {/* <!-- Blanner --> */ }
// <main className="container ui-wrapper">
//     <section className="ui-section ui-section-warning">
//         <div className="ui-canvas ui-subHero-yellow" data-yellowmark="Information">
//             <div className="ui-container mb-2 justify-content-center">
//                 {/* 之後要補防詐宣導 */}
//                 <div class="ui-subHero-yellow__aside">
//                     <h2>小心假冒「動保處」的釣魚簡訊！</h2>
//                     <br />
//                     <p> 近日有賣家收到謊稱「寵物登記異常」的簡訊，要求點擊連結補件。這是詐騙！請直接刪除，勿輸入個資。</p>
//                 </div>
//             </div>
//             {/* 麵包屑區 */}
//             <div className="ui-subHero__breadcrumb">
//                 <div className="ui-container">
//                     <nav className="ui-breadcrumb">
//                         <div className="d-flex align-items-center gap-1">
//                             <a href="#">首頁</a>
//                             <i data-feather="chevron-right"></i>
//                             <span className="ui-breadcrumb__current">稀寵資訊</span>
//                         </div>
//                     </nav>
//                 </div>
//             </div>
//         </div>
//     </section>
// </main>
// {/* 主要內容 */ }
// <section className="rarepet-info-section pt-1 pb-5 mt-5">
//     <div className="container pb-5 ">
//         {/* <!-- 切換按鈕 --> */}
//         <div className="row justify-content-center g-2 g-lg-3 mb-4">
//             <div className="col-6 col-lg-auto text-center">
//                 <button className="rp-filter-btn active" data-filter="all">全部</button>
//             </div>
//             <div className="col-6 col-lg-auto text-center">
//                 <button className="rp-filter-btn" data-filter="rare">稀寵資訊</button>
//             </div>
//             <div className="col-6 col-lg-auto text-center">
//                 <button className="rp-filter-btn" data-filter="event">活動資訊</button>
//             </div>
//             <div className="col-6 col-lg-auto text-center">
//                 <button className="rp-filter-btn" data-filter="anti">防詐騙</button>
//             </div>
//         </div>



//         {/* <!-- 卡片列表 Grid -->
//                 <!-- data-type= anti-scam  event tips--> */}
//         <div className="row g-3 g-md-4">

//             {/* <!-- 卡片 1  --> */}
//             <div className="col-6 col-lg-4" data-type="anti-scam">
//                 <article className="rp-article-card">
//                     <div className="rp-article-media">
//                         <span className="rp-article-tag bg-warning">防詐騙</span>
//                         <img src="../src/assets/images/簡訊通知寵物登記異常.jpg" alt="假冒動保處詐騙簡訊提醒" className="rp-article-img" />
//                     </div>

//                     <div className="rp-article-body">
//                         <p className="rp-article-date">2025-12-01</p>
//                         <h3 className="rp-article-title">
//                             假冒「動保處」簡訊通知寵物登記異常？千萬別點連結！
//                         </h3>
//                         <p className="rp-article-desc">
//                             近日多位飼主收到詐騙簡訊，謊稱資料未更新將停用寵物登記帳號…
//                         </p>
//                         <a href="#" className="rp-article-link $ui-blue-700">繼續閱讀</a>
//                     </div>
//                 </article>
//             </div>

//             {/* <!-- 卡片 2  --> */}
//             <div className="col-6 col-lg-4" data-type="anti-scam">
//                 <article className="rp-article-card">
//                     <div className="rp-article-media">
//                         <span className="rp-article-tag bg-warning">防詐騙</span>
//                         <img src="../src/assets/images/簡訊通知寵物登記異常.jpg" alt="假冒動保處詐騙簡訊提醒" className="rp-article-img" />
//                     </div>

//                     <div className="rp-article-body">
//                         <p className="rp-article-date">2025-12-01</p>
//                         <h3 className="rp-article-title">
//                             假冒「動保處」簡訊通知寵物登記異常？千萬別點連結！
//                         </h3>
//                         <p className="rp-article-desc">
//                             近日多位飼主收到詐騙簡訊，謊稱資料未更新將停用寵物登記帳號…
//                         </p>
//                         <a href="#" className="rp-article-link $ui-blue-700">繼續閱讀</a>
//                     </div>
//                 </article>
//             </div>

//             {/* <!-- 卡片 3  --> */}
//             <div className="col-6 col-lg-4" data-type="anti-scam">
//                 <article className="rp-article-card">
//                     <div className="rp-article-media">
//                         <span className="rp-article-tag bg-warning">防詐騙</span>
//                         <img src="../src/assets/images/簡訊通知寵物登記異常.jpg" alt="假冒動保處詐騙簡訊提醒" className="rp-article-img" />
//                     </div>

//                     <div className="rp-article-body">
//                         <p className="rp-article-date">2025-12-01</p>
//                         <h3 className="rp-article-title">
//                             假冒「動保處」簡訊通知寵物登記異常？千萬別點連結！
//                         </h3>
//                         <p className="rp-article-desc">
//                             近日多位飼主收到詐騙簡訊，謊稱資料未更新將停用寵物登記帳號…
//                         </p>
//                         <a href="#" className="rp-article-link $ui-blue-700">繼續閱讀</a>
//                     </div>
//                 </article>
//             </div>

//             {/* <!-- 卡片 4  --> */}
//             <div className="col-6 col-lg-4" data-type="anti-scam">
//                 <article className="rp-article-card">
//                     <div className="rp-article-media">
//                         <span className="rp-article-tag bg-warning">防詐騙</span>
//                         <img src="../src/assets/images/簡訊通知寵物登記異常.jpg" alt="假冒動保處詐騙簡訊提醒" className="rp-article-img" />
//                     </div>

//                     <div className="rp-article-body">
//                         <p className="rp-article-date">2025-12-01</p>
//                         <h3 className="rp-article-title">
//                             假冒「動保處」簡訊通知寵物登記異常？千萬別點連結！
//                         </h3>
//                         <p className="rp-article-desc">
//                             近日多位飼主收到詐騙簡訊，謊稱資料未更新將停用寵物登記帳號…
//                         </p>
//                         <a href="#" className="rp-article-link $ui-blue-700">繼續閱讀</a>
//                     </div>
//                 </article>
//             </div>

//             {/* <!-- 卡片 5  --> */}
//             <div className="col-6 col-lg-4" data-type="anti-scam">
//                 <article className="rp-article-card">
//                     <div className="rp-article-media">
//                         <span className="rp-article-tag bg-warning">防詐騙</span>
//                         <img src="../src/assets/images/簡訊通知寵物登記異常.jpg" alt="假冒動保處詐騙簡訊提醒" className="rp-article-img" />
//                     </div>

//                     <div className="rp-article-body">
//                         <p className="rp-article-date">2025-12-01</p>
//                         <h3 className="rp-article-title">
//                             假冒「動保處」簡訊通知寵物登記異常？千萬別點連結！
//                         </h3>
//                         <p className="rp-article-desc">
//                             近日多位飼主收到詐騙簡訊，謊稱資料未更新將停用寵物登記帳號…
//                         </p>
//                         <a href="#" className="rp-article-link $ui-blue-700">繼續閱讀</a>
//                     </div>
//                 </article>
//             </div>

//             {/* <!-- 卡片 6  --> */}
//             <div className="col-6 col-lg-4" data-type="anti-scam">
//                 <article className="rp-article-card">
//                     <div className="rp-article-media">
//                         <span className="rp-article-tag bg-warning">防詐騙</span>
//                         <img src="../src/assets/images/簡訊通知寵物登記異常.jpg" alt="假冒動保處詐騙簡訊提醒" className="rp-article-img" />
//                     </div>

//                     <div className="rp-article-body">
//                         <p className="rp-article-date">2025-12-01</p>
//                         <h3 className="rp-article-title">
//                             假冒「動保處」簡訊通知寵物登記異常？千萬別點連結！
//                         </h3>
//                         <p className="rp-article-desc">
//                             近日多位飼主收到詐騙簡訊，謊稱資料未更新將停用寵物登記帳號…
//                         </p>
//                         <a href="#" className="rp-article-link $ui-blue-700">繼續閱讀</a>
//                     </div>
//                 </article>
//             </div>

//             {/* <!-- 卡片 7  --> */}
//             <div className="col-6 col-lg-4" data-type="anti-scam">
//                 <article className="rp-article-card">
//                     <div className="rp-article-media">
//                         <span className="rp-article-tag bg-warning">防詐騙</span>
//                         <img src="../src/assets/images/簡訊通知寵物登記異常.jpg" alt="假冒動保處詐騙簡訊提醒" className="rp-article-img" />
//                     </div>

//                     <div className="rp-article-body">
//                         <p className="rp-article-date">2025-12-01</p>
//                         <h3 className="rp-article-title">
//                             假冒「動保處」簡訊通知寵物登記異常？千萬別點連結！
//                         </h3>
//                         <p className="rp-article-desc">
//                             近日多位飼主收到詐騙簡訊，謊稱資料未更新將停用寵物登記帳號…
//                         </p>
//                         <a href="#" className="rp-article-link $ui-blue-700">繼續閱讀</a>
//                     </div>
//                 </article>
//             </div>

//             {/* <!-- 卡片 8  --> */}
//             <div className="col-6 col-lg-4" data-type="anti-scam">
//                 <article className="rp-article-card">
//                     <div className="rp-article-media">
//                         <span className="rp-article-tag bg-warning">防詐騙</span>
//                         <img src="../src/assets/images/簡訊通知寵物登記異常.jpg" alt="假冒動保處詐騙簡訊提醒" className="rp-article-img" />
//                     </div>

//                     <div className="rp-article-body">
//                         <p className="rp-article-date">2025-12-01</p>
//                         <h3 className="rp-article-title">
//                             假冒「動保處」簡訊通知寵物登記異常？千萬別點連結！
//                         </h3>
//                         <p className="rp-article-desc">
//                             近日多位飼主收到詐騙簡訊，謊稱資料未更新將停用寵物登記帳號…
//                         </p>
//                         <a href="#" className="rp-article-link $ui-blue-700">繼續閱讀</a>
//                     </div>
//                 </article>
//             </div>

//             {/* <!-- 桌機擴展第 9 張 --> */}
//             <div className="col-6 col-lg-4" data-type="anti-scam">
//                 <article className="rp-article-card">
//                     <div className="rp-article-media">
//                         <span className="rp-article-tag bg-warning">防詐騙</span>
//                         <img src="../src/assets/images/簡訊通知寵物登記異常.jpg" alt="假冒動保處詐騙簡訊提醒" className="rp-article-img" />
//                     </div>

//                     <div className="rp-article-body">
//                         <p className="rp-article-date">2025-12-01</p>
//                         <h3 className="rp-article-title">
//                             假冒「動保處」簡訊通知寵物登記異常？千萬別點連結！
//                         </h3>
//                         <p className="rp-article-desc">
//                             近日多位飼主收到詐騙簡訊，謊稱資料未更新將停用寵物登記帳號…
//                         </p>
//                         <a href="#" className="rp-article-link $ui-blue-700">繼續閱讀</a>
//                     </div>
//                 </article>
//             </div>
//         </div>
//     </div>
// </section>
// {/* <!-- 頁碼區 --> */ }
// <div className="container justify-content-center mb-5">
//     <div className="row">
//         <div className="col-6">
//             <nav className="ui-pagination" aria-label="Pagination">
//                 <button className="ui-pagination__item ui-pagination__item--prev is-disabled"
//                     aria-label="Previous page" disabled>
//                     ‹
//                 </button>

//                 <button className="ui-pagination__item ui-pagination__item--prev"
//                     aria-label="Previous page">
//                     ‹
//                 </button>
//                 <button className="ui-pagination__item">1</button>
//                 <button className="ui-pagination__item is-active" aria-current="page">
//                     2
//                 </button>
//                 <button className="ui-pagination__item">3</button>
//                 <button className="ui-pagination__item ui-pagination__item--next"
//                     aria-label="Next page">
//                     ›
//                 </button>
//             </nav>
//         </div>
//     </div>
// </div>

