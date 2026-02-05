
//防詐宣導區section
import { useRef } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

export default function Scam() {
    const paginationRef = useRef(null);
    return (<>
        <section className="scam-section">
            <header className="scam-header">
                <h2 className="scam-section-title-zh">防詐騙宣導</h2>
                <p className="scam-section-title-en">Scam Prevention</p>
            </header>

            <div className="scam-content-wrapper">
                <div className="scam-panel">
                    <div className="markPic" />

                    <div className="scam-swiper-wrap">
                        <Swiper
                            className="scam-swiper"
                            modules={[Pagination, Autoplay]}
                            loop
                            slidesPerView={1}
                            centeredSlides
                            autoplay={{ delay: 20000, disableOnInteraction: false }}
                            pagination={{
                                clickable: true,
                                el: paginationRef.current,
                            }}
                            onBeforeInit={(swiper) => {

                                swiper.params.pagination.el = paginationRef.current;
                            }}
                        >
                            {/*  Slide 1  */}
                            <SwiperSlide>
                                <article className="scam-card">
                                    <div className="scam-card__content">
                                        <h3 className="scam-card__title">
                                            【每日揭詐】11/12 愛心被利用！「假送養寵物真詐騙」慣用招數曝光
                                        </h3>
                                        <p className="scam-card__text">
                                            防詐中心公布最新統計資料，11/12全國共受理457件詐騙案件，財產損失金額高達新台幣2億5487.5萬元。*詐騙手法前5名(依財損金額排序)1.假投資詐騙56件1億1433.8萬2.假檢警詐騙15件4987.5萬3.假交友(投資詐財)詐騙...
                                        </p>
                                        <a href="#" className="scam-card__link ">繼續閱讀</a>
                                    </div>
                                </article>
                            </SwiperSlide>

                            {/*  Slide 2  */}
                            <SwiperSlide>
                                <article className="scam-card">
                                    <div className="scam-card__content">
                                        <h3 className="scam-card__title">
                                            【每日揭詐】11/12 愛心被利用！「假送養寵物真詐騙」慣用招數曝光
                                        </h3>
                                        <p className="scam-card__text">
                                            防詐中心公布最新統計資料，11/12全國共受理457件詐騙案件，財產損失金額高達新台幣2億5487.5萬元。*詐騙手法前5名(依財損金額排序)1.假投資詐騙56件1億1433.8萬2.假檢警詐騙15件4987.5萬3.假交友(投資詐財)詐騙...
                                        </p>
                                        <a href="#" className="scam-card__link ">繼續閱讀</a>
                                    </div>
                                </article>
                            </SwiperSlide>

                            {/*  Slide 3  */}
                            <SwiperSlide>
                                <article className="scam-card">
                                    <div className="scam-card__content">
                                        <h3 className="scam-card__title">
                                            【每日揭詐】11/12 愛心被利用！「假送養寵物真詐騙」慣用招數曝光
                                        </h3>
                                        <p className="scam-card__text">
                                            防詐中心公布最新統計資料，11/12全國共受理457件詐騙案件，財產損失金額高達新台幣2億5487.5萬元。*詐騙手法前5名(依財損金額排序)1.假投資詐騙56件1億1433.8萬2.假檢警詐騙15件4987.5萬3.假交友(投資詐財)詐騙...
                                        </p>
                                        <a href="#" className="scam-card__link ">繼續閱讀</a>
                                    </div>
                                </article>
                            </SwiperSlide>
                        </Swiper>
                        {/*  pagination  */}
                        <div ref={paginationRef} className="scam-pagination" />
                    </div>
                </div>
            </div>
        </section >
    </>)
}