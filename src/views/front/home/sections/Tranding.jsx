
import { useCallback, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

export default function Tranding() {
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    const updateDim = useCallback((swiper) => {
        if (!swiper?.slides?.length) return;

        const slides = swiper.slides; // DOM elements
        const total = slides.length;

        // 你原本是 >= 992 當桌機 dim 邏輯
        const isDesktop = window.innerWidth >= 992;

        // 先全部變暗
        slides.forEach((slide) => slide.classList.add("is-dim"));

        if (isDesktop) {
            const firstVisible = swiper.activeIndex;
            for (let offset = 1; offset <= 4; offset++) {
                const idx = (firstVisible + offset) % total;
                slides[idx]?.classList.remove("is-dim");
            }
        } else {
            const active = swiper.activeIndex % total;
            slides[active]?.classList.remove("is-dim");
        }
    }, []);

    return (
        <section className="trending-section">
            <header className="scam-header">
                <h2 className="scam-section-title-zh">熱門分類</h2>
                <p className="scam-section-title-en">Trending</p>
            </header>

            <div className="container-slider-zone">
                <Swiper
                    className="trending-swiper"
                    modules={[Navigation, Autoplay]}
                    loop={true}
                    centeredSlides={true}
                    slidesPerView={1.9}
                    spaceBetween={16}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    breakpoints={{
                        800: { slidesPerView: 3.2, spaceBetween: 20, centeredSlides: false },
                        1000: { slidesPerView: 3.4, spaceBetween: 24, centeredSlides: false },
                        1300: { slidesPerView: 4.5, spaceBetween: 20, centeredSlides: false },
                        1500: {
                            slidesPerView: 4.7,
                            spaceBetween: 24,
                            slidesPerGroup: 1,
                            centeredSlides: false,
                            loop: true,
                        },
                        1600: {
                            slidesPerView: 6,
                            spaceBetween: 24,
                            slidesPerGroup: 1,
                            centeredSlides: false,
                            loop: true,
                        },
                    }}
                    navigation={{
                        prevEl: prevRef.current,
                        nextEl: nextRef.current,
                    }}
                    onBeforeInit={(swiper) => {
                        // ✅ init 前把 navigation 綁到 ref（不靠 selector）
                        swiper.params.navigation.prevEl = prevRef.current;
                        swiper.params.navigation.nextEl = nextRef.current;
                    }}
                    onInit={(swiper) => {
                        // ✅ navigation 需要 init/update
                        swiper.navigation.init();
                        swiper.navigation.update();

                        updateDim(swiper);
                    }}
                    onSlideChange={(swiper) => updateDim(swiper)}
                    onResize={(swiper) => updateDim(swiper)}
                >
                    {/*  Card 1   */}
                    <SwiperSlide className="trending-card">
                        <article className="swiper-slide trending-card">
                            <a className="trending-card__link" href="#">
                                <div className="trending-card__circle">
                                    <img className="trending-card__img" src="/src/assets/img/homeTrending/trending-callDuck.jpg" alt="柯爾鴨" />
                                </div>
                                <div className="trending-card__plate">
                                    <div className="trending-card__name">柯爾鴨</div>
                                    <div className="trending-card__count">15項搜尋結果</div>
                                </div>
                            </a>
                        </article>
                    </SwiperSlide>
                    {/*  Card 2   */}
                    <SwiperSlide className="trending-card">
                        <article className="swiper-slide trending-card">
                            <a className="trending-card__link" href="#">
                                <div className="trending-card__circle">
                                    <img className="trending-card__img" src="/src/assets/img/homeTrending/trending-Parrot.jpg" alt="鸚鵡" />
                                </div>
                                <div className="trending-card__plate">
                                    <div className="trending-card__name">鸚鵡</div>
                                    <div className="trending-card__count">23項搜尋結果</div>
                                </div>
                            </a>
                        </article>
                    </SwiperSlide>
                    {/*  Card 3   */}
                    <SwiperSlide className="trending-card">
                        <article className="swiper-slide trending-card">
                            <a className="trending-card__link" href="#">
                                <div className="trending-card__circle">
                                    <img className="trending-card__img" src="/src/assets/img/homeTrending/trending-Tortoise.jpg" alt="烏龜" />
                                </div>
                                <div className="trending-card__plate">
                                    <div className="trending-card__name">烏龜</div>
                                    <div className="trending-card__count">32項搜尋結果</div>
                                </div>
                            </a>
                        </article>
                    </SwiperSlide>
                    {/*  Card 4   */}
                    <SwiperSlide className="trending-card">
                        <article className="swiper-slide trending-card">
                            <a className="trending-card__link" href="#">
                                <div className="trending-card__circle">
                                    <img className="trending-card__img" src="/src/assets/img/homeTrending/trending-Gekkota.jpg" alt="守宮" />
                                </div>
                                <div className="trending-card__plate">
                                    <div className="trending-card__name">守宮</div>
                                    <div className="trending-card__count">9項搜尋結果</div>
                                </div>
                            </a>
                        </article>
                    </SwiperSlide>
                    {/*  Card 5   */}
                    <SwiperSlide className="trending-card">
                        <article className="swiper-slide trending-card">
                            <a className="trending-card__link" href="#">
                                <div className="trending-card__circle">
                                    <img className="trending-card__img" src="/src/assets/img/homeTrending/trending-Hamster.jpg" alt="倉鼠" />
                                </div>
                                <div className="trending-card__plate">
                                    <div className="trending-card__name">倉鼠</div>
                                    <div className="trending-card__count">16項搜尋結果</div>
                                </div>
                            </a>
                        </article>
                    </SwiperSlide>
                    {/*  Card 6   */}
                    <SwiperSlide className="trending-card">
                        <article className="swiper-slide trending-card">
                            <a className="trending-card__link" href="#">
                                <div className="trending-card__circle">
                                    <img className="trending-card__img" src="/src/assets/img/homeTrending/trending-Hedgehog.jpg" alt="刺蝟" />
                                </div>
                                <div className="trending-card__plate">
                                    <div className="trending-card__name">刺蝟</div>
                                    <div className="trending-card__count">15項搜尋結果</div>
                                </div>
                            </a>
                        </article>
                    </SwiperSlide>
                    {/*  Card 1   */}
                    <SwiperSlide className="trending-card">
                        <article className="swiper-slide trending-card">
                            <a className="trending-card__link" href="#">
                                <div className="trending-card__circle">
                                    <img className="trending-card__img" src="/src/assets/img/homeTrending/trending-callDuck.jpg" alt="柯爾鴨" />
                                </div>
                                <div className="trending-card__plate">
                                    <div className="trending-card__name">柯爾鴨</div>
                                    <div className="trending-card__count">15項搜尋結果</div>
                                </div>
                            </a>
                        </article>
                    </SwiperSlide>
                    {/*  Card 2   */}
                    <SwiperSlide className="trending-card">
                        <article className="swiper-slide trending-card">
                            <a className="trending-card__link" href="#">
                                <div className="trending-card__circle">
                                    <img className="trending-card__img" src="/src/assets/img/homeTrending/trending-Parrot.jpg" alt="鸚鵡" />
                                </div>
                                <div className="trending-card__plate">
                                    <div className="trending-card__name">鸚鵡</div>
                                    <div className="trending-card__count">23項搜尋結果</div>
                                </div>
                            </a>
                        </article>
                    </SwiperSlide>
                    {/*  Card 3   */}
                    <SwiperSlide className="trending-card">
                        <article className="swiper-slide trending-card">
                            <a className="trending-card__link" href="#">
                                <div className="trending-card__circle">
                                    <img className="trending-card__img" src="/src/assets/img/homeTrending/trending-Tortoise.jpg" alt="烏龜" />
                                </div>
                                <div className="trending-card__plate">
                                    <div className="trending-card__name">烏龜</div>
                                    <div className="trending-card__count">32項搜尋結果</div>
                                </div>
                            </a>
                        </article>
                    </SwiperSlide>
                    {/*  Card 4   */}
                    <SwiperSlide className="trending-card">
                        <article className="swiper-slide trending-card">
                            <a className="trending-card__link" href="#">
                                <div className="trending-card__circle">
                                    <img className="trending-card__img" src="/src/assets/img/homeTrending/trending-Gekkota.jpg" alt="守宮" />
                                </div>
                                <div className="trending-card__plate">
                                    <div className="trending-card__name">守宮</div>
                                    <div className="trending-card__count">9項搜尋結果</div>
                                </div>
                            </a>
                        </article>
                    </SwiperSlide>
                    {/*  Card 5   */}
                    <SwiperSlide className="trending-card">
                        <article className="swiper-slide trending-card">
                            <a className="trending-card__link" href="#">
                                <div className="trending-card__circle">
                                    <img className="trending-card__img" src="/src/assets/img/homeTrending/trending-Hamster.jpg" alt="倉鼠" />
                                </div>
                                <div className="trending-card__plate">
                                    <div className="trending-card__name">倉鼠</div>
                                    <div className="trending-card__count">16項搜尋結果</div>
                                </div>
                            </a>
                        </article>
                    </SwiperSlide>
                    {/*  Card 6   */}
                    <SwiperSlide className="trending-card">
                        <article className="swiper-slide trending-card">
                            <a className="trending-card__link" href="#">
                                <div className="trending-card__circle">
                                    <img className="trending-card__img" src="/src/assets/img/homeTrending/trending-Hedgehog.jpg" alt="刺蝟" />
                                </div>
                                <div className="trending-card__plate">
                                    <div className="trending-card__name">刺蝟</div>
                                    <div className="trending-card__count">15項搜尋結果</div>
                                </div>
                            </a>
                        </article>
                    </SwiperSlide>
                </Swiper>

                {/* 桌機左右箭頭 暫時用svg之後用元件替換 */}
                <button
                    ref={prevRef}
                    type="button"
                    className="trending-nav trending-nav--prev"
                    aria-label="上一個熱門分類"
                >
                    <img src="/src/assets/btn-arrowA1.svg" aria-hidden="true" />
                </button>

                <button
                    ref={nextRef}
                    type="button"
                    className="trending-nav trending-nav--next"
                    aria-label="下一個熱門分類"
                >
                    <img src="/src/assets/btn-arrowA2.svg" aria-hidden="true" />
                </button>
            </div>
        </section>

    )
}