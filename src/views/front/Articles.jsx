// 稀寵資訊 分頁

import ArticlesHero from '../../components/subHero/ArticlesHero';
import SubHero from '../../components/subHero/SubHero';
// import { ChevronRight } from 'react-feather';

export default function Articles() {
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
                防詐騙
              </button>
            </div>
          </div>
          {/* <!-- 卡片列表 Grid -->*/}
          <div className="row g-3 g-md-4">
            {/* <!-- 卡片 1  --> */}
            <div className="col-6 col-lg-4" data-type="anti-scam">
              <article className="rp-article-card">
                <div className="rp-article-media">
                  <span className="rp-article-tag bg-warning">防詐騙</span>
                  <img
                    src="../src/assets/img/簡訊通知寵物登記異常.jpg"
                    alt="假冒動保處詐騙簡訊提醒"
                    className="rp-article-img"
                  />
                </div>

                <div className="rp-article-body">
                  <p className="rp-article-date">2025-12-01</p>
                  <h3 className="rp-article-title">
                    假冒「動保處」簡訊通知寵物登記異常？千萬別點連結！
                  </h3>
                  <p className="rp-article-desc">
                    近日多位飼主收到詐騙簡訊，謊稱資料未更新將停用寵物登記帳號…
                  </p>
                  <a href="#" className="rp-article-link $ui-blue-700">
                    繼續閱讀
                  </a>
                </div>
              </article>
            </div>

            {/* <!-- 卡片 2  --> */}
            <div className="col-6 col-lg-4" data-type="anti-scam">
              <article className="rp-article-card">
                <div className="rp-article-media">
                  <span className="rp-article-tag bg-warning">防詐騙</span>
                  <img
                    src="../src/assets/img/簡訊通知寵物登記異常.jpg"
                    alt="假冒動保處詐騙簡訊提醒"
                    className="rp-article-img"
                  />
                </div>

                <div className="rp-article-body">
                  <p className="rp-article-date">2025-12-01</p>
                  <h3 className="rp-article-title">
                    假冒「動保處」簡訊通知寵物登記異常？千萬別點連結！
                  </h3>
                  <p className="rp-article-desc">
                    近日多位飼主收到詐騙簡訊，謊稱資料未更新將停用寵物登記帳號…
                  </p>
                  <a href="#" className="rp-article-link $ui-blue-700">
                    繼續閱讀
                  </a>
                </div>
              </article>
            </div>

            {/* <!-- 卡片 3  --> */}
            <div className="col-6 col-lg-4" data-type="anti-scam">
              <article className="rp-article-card">
                <div className="rp-article-media">
                  <span className="rp-article-tag bg-warning">防詐騙</span>
                  <img
                    src="../src/assets/img/簡訊通知寵物登記異常.jpg"
                    alt="假冒動保處詐騙簡訊提醒"
                    className="rp-article-img"
                  />
                </div>

                <div className="rp-article-body">
                  <p className="rp-article-date">2025-12-01</p>
                  <h3 className="rp-article-title">
                    假冒「動保處」簡訊通知寵物登記異常？千萬別點連結！
                  </h3>
                  <p className="rp-article-desc">
                    近日多位飼主收到詐騙簡訊，謊稱資料未更新將停用寵物登記帳號…
                  </p>
                  <a href="#" className="rp-article-link $ui-blue-700">
                    繼續閱讀
                  </a>
                </div>
              </article>
            </div>

            {/* <!-- 卡片 4  --> */}
            <div className="col-6 col-lg-4" data-type="anti-scam">
              <article className="rp-article-card">
                <div className="rp-article-media">
                  <span className="rp-article-tag bg-warning">防詐騙</span>
                  <img
                    src="../src/assets/img/簡訊通知寵物登記異常.jpg"
                    alt="假冒動保處詐騙簡訊提醒"
                    className="rp-article-img"
                  />
                </div>

                <div className="rp-article-body">
                  <p className="rp-article-date">2025-12-01</p>
                  <h3 className="rp-article-title">
                    假冒「動保處」簡訊通知寵物登記異常？千萬別點連結！
                  </h3>
                  <p className="rp-article-desc">
                    近日多位飼主收到詐騙簡訊，謊稱資料未更新將停用寵物登記帳號…
                  </p>
                  <a href="#" className="rp-article-link $ui-blue-700">
                    繼續閱讀
                  </a>
                </div>
              </article>
            </div>

            {/* <!-- 卡片 5  --> */}
            <div className="col-6 col-lg-4" data-type="anti-scam">
              <article className="rp-article-card">
                <div className="rp-article-media">
                  <span className="rp-article-tag bg-warning">防詐騙</span>
                  <img
                    src="../src/assets/img/簡訊通知寵物登記異常.jpg"
                    alt="假冒動保處詐騙簡訊提醒"
                    className="rp-article-img"
                  />
                </div>

                <div className="rp-article-body">
                  <p className="rp-article-date">2025-12-01</p>
                  <h3 className="rp-article-title">
                    假冒「動保處」簡訊通知寵物登記異常？千萬別點連結！
                  </h3>
                  <p className="rp-article-desc">
                    近日多位飼主收到詐騙簡訊，謊稱資料未更新將停用寵物登記帳號…
                  </p>
                  <a href="#" className="rp-article-link $ui-blue-700">
                    繼續閱讀
                  </a>
                </div>
              </article>
            </div>

            {/* <!-- 卡片 6  --> */}
            <div className="col-6 col-lg-4" data-type="anti-scam">
              <article className="rp-article-card">
                <div className="rp-article-media">
                  <span className="rp-article-tag bg-warning">防詐騙</span>
                  <img
                    src="../src/assets/img/簡訊通知寵物登記異常.jpg"
                    alt="假冒動保處詐騙簡訊提醒"
                    className="rp-article-img"
                  />
                </div>

                <div className="rp-article-body">
                  <p className="rp-article-date">2025-12-01</p>
                  <h3 className="rp-article-title">
                    假冒「動保處」簡訊通知寵物登記異常？千萬別點連結！
                  </h3>
                  <p className="rp-article-desc">
                    近日多位飼主收到詐騙簡訊，謊稱資料未更新將停用寵物登記帳號…
                  </p>
                  <a href="#" className="rp-article-link $ui-blue-700">
                    繼續閱讀
                  </a>
                </div>
              </article>
            </div>

            {/* <!-- 卡片 7  --> */}
            <div className="col-6 col-lg-4" data-type="anti-scam">
              <article className="rp-article-card">
                <div className="rp-article-media">
                  <span className="rp-article-tag bg-warning">防詐騙</span>
                  <img
                    src="../src/assets/img/簡訊通知寵物登記異常.jpg"
                    alt="假冒動保處詐騙簡訊提醒"
                    className="rp-article-img"
                  />
                </div>

                <div className="rp-article-body">
                  <p className="rp-article-date">2025-12-01</p>
                  <h3 className="rp-article-title">
                    假冒「動保處」簡訊通知寵物登記異常？千萬別點連結！
                  </h3>
                  <p className="rp-article-desc">
                    近日多位飼主收到詐騙簡訊，謊稱資料未更新將停用寵物登記帳號…
                  </p>
                  <a href="#" className="rp-article-link $ui-blue-700">
                    繼續閱讀
                  </a>
                </div>
              </article>
            </div>

            {/* <!-- 卡片 8  --> */}
            <div className="col-6 col-lg-4" data-type="anti-scam">
              <article className="rp-article-card">
                <div className="rp-article-media">
                  <span className="rp-article-tag bg-warning">防詐騙</span>
                  <img
                    src="../src/assets/img/簡訊通知寵物登記異常.jpg"
                    alt="假冒動保處詐騙簡訊提醒"
                    className="rp-article-img"
                  />
                </div>

                <div className="rp-article-body">
                  <p className="rp-article-date">2025-12-01</p>
                  <h3 className="rp-article-title">
                    假冒「動保處」簡訊通知寵物登記異常？千萬別點連結！
                  </h3>
                  <p className="rp-article-desc">
                    近日多位飼主收到詐騙簡訊，謊稱資料未更新將停用寵物登記帳號…
                  </p>
                  <a href="#" className="rp-article-link $ui-blue-700">
                    繼續閱讀
                  </a>
                </div>
              </article>
            </div>

            {/* <!-- 桌機擴展第 9 張 --> */}
            <div className="col-6 col-lg-4" data-type="anti-scam">
              <article className="rp-article-card">
                <div className="rp-article-media">
                  <span className="rp-article-tag bg-warning">防詐騙</span>
                  <img
                    src="../src/assets/img/簡訊通知寵物登記異常.jpg"
                    alt="假冒動保處詐騙簡訊提醒"
                    className="rp-article-img"
                  />
                </div>

                <div className="rp-article-body">
                  <p className="rp-article-date">2025-12-01</p>
                  <h3 className="rp-article-title">
                    假冒「動保處」簡訊通知寵物登記異常？千萬別點連結！
                  </h3>
                  <p className="rp-article-desc">
                    近日多位飼主收到詐騙簡訊，謊稱資料未更新將停用寵物登記帳號…
                  </p>
                  <a href="#" className="rp-article-link $ui-blue-700">
                    繼續閱讀
                  </a>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- 頁碼區 --> */}
    </>
  );
}
