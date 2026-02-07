export default function RepostPost() {
  return (
    <>
      <section className="section-cta">
        <div className="section-cta__inner">
          <div className="section-cta__list">
            {/*  卡片 1：詐騙/錯假資訊  */}
            <div className="section-cta__card section-cta__card--alert">
              <div className="feature-cardbg"></div>
              {/*  裝飾用  */}
              <div className="section-cta-alter__content">
                <h3 className="section-cta__title">保持警惕：詐騙 / 假資訊</h3>
                <p className="section-cta__text">
                  回報可疑訊息、過期和錯誤資訊，讓我們一起為社群把關！
                </p>
                <button
                  type="button"
                  className="btn btn-warning section-cta__btn"
                >
                  回報詐騙 / 錯誤
                </button>
              </div>
            </div>

            {/*  卡片 2：貢獻社群 / 分享投稿  */}
            <div className="section-cta__card section-cta__card--contribute">
              <div className="section-cta-contribute__content">
                <h3 className="section-cta__title">貢獻社群：分享投稿</h3>
                <p className="section-cta__text">
                  無論是新店開幕、活動舉辦或寵物友善空間，歡迎你的情報！
                </p>
                <button type="button" className="btn btn-info section-cta__btn">
                  投稿稀寵情報
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
