import { useCallback, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'react-feather';
//引入swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
//引入圖片
import callDuckImg from '@/assets/img/homeTrending/trending-callDuck.jpg';
import gekkota from '@/assets/img/homeTrending/trending-Gekkota.jpg';
import hamster from '@/assets/img/homeTrending/trending-Hamster.jpg';
import hedgehog from '@/assets/img/homeTrending/trending-Hedgehog.jpg';
import parrot from '@/assets/img/homeTrending/trending-Parrot.jpg';
import tortoise from '@/assets/img/homeTrending/trending-Tortoise.jpg';

export default function Tranding() {
  //swiper 功能
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  //swiper 功能
  const updateDim = useCallback((swiper) => {
    if (!swiper?.slides?.length) return;

    const slides = swiper.slides; // DOM elements
    const total = slides.length;

    // 你原本是 >= 992 當桌機 dim 邏輯
    const isDesktop = window.innerWidth >= 992;

    // 先全部變暗
    slides.forEach((slide) => slide.classList.add('is-dim'));

    if (isDesktop) {
      const firstVisible = swiper.activeIndex;
      for (let offset = 1; offset <= 4; offset++) {
        const idx = (firstVisible + offset) % total;
        slides[idx]?.classList.remove('is-dim');
      }
    } else {
      const active = swiper.activeIndex % total;
      slides[active]?.classList.remove('is-dim');
    }
  }, []);

  //寫死的data，之後可以改成api
  const trendingData = [
    {
      id: 1,
      animal: '柯爾鴨',
      searchNum: 15,
      img: callDuckImg,
    },
    {
      id: 2,
      animal: '鸚鵡',
      searchNum: 9,
      img: parrot,
    },
    {
      id: 3,
      animal: '烏龜',
      searchNum: 20,
      img: tortoise,
    },
    {
      id: 4,
      animal: '守宮',
      searchNum: 19,
      img: gekkota,
    },
    {
      id: 5,
      animal: '倉鼠',
      searchNum: 10,
      img: hamster,
    },
    {
      id: 6,
      animal: '刺蝟',
      searchNum: 5,
      img: hedgehog,
    },
    {
      id: 7,
      animal: '柯爾鴨',
      searchNum: 15,
      img: callDuckImg,
    },
    {
      id: 8,
      animal: '鸚鵡',
      searchNum: 9,
      img: parrot,
    },
    {
      id: 9,
      animal: '烏龜',
      searchNum: 20,
      img: tortoise,
    },
    {
      id: 10,
      animal: '守宮',
      searchNum: 19,
      img: gekkota,
    },
    {
      id: 11,
      animal: '倉鼠',
      searchNum: 10,
      img: hamster,
    },
    {
      id: 12,
      animal: '刺蝟',
      searchNum: 5,
      img: hedgehog,
    },
  ];

  //待修問題：
  //最後記得npm prettier --write 指定檔案名

  return (
    <section className="trending-section">
      <header className="scam-header">
        <h2 className="scam-section-title-zh">熱門分類</h2>
        <p className="scam-section-title-en">Trending</p>
      </header>

      <div className="container-slider-zone">
        {/* 桌機左右箭頭 */}
        <button
          ref={prevRef}
          type="button"
          className="ui-carousel__btn ui-carousel__btn--prev"
          aria-label="Previous"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          ref={nextRef}
          type="button"
          className="ui-carousel__btn ui-carousel__btn--next"
          aria-label="Next"
        >
          <ChevronRight size={20} />
        </button>

        <Swiper
          className="trending-swiper"
          modules={[Navigation, Autoplay]}
          navigation={true}
          loop={true}
          centeredSlides={true}
          slidesPerView={1.9}
          spaceBetween={16}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          //RWD解法
          breakpoints={{
            800: {
              slidesPerView: 3.2,
              spaceBetween: 20,
              centeredSlides: false,
            },
            1000: {
              slidesPerView: 3.4,
              spaceBetween: 24,
              centeredSlides: false,
            },
            1300: {
              slidesPerView: 4.5,
              spaceBetween: 20,
              centeredSlides: false,
            },
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
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          onInit={(swiper) => {
            swiper.navigation.init();
            swiper.navigation.update();
            updateDim(swiper);
          }}
          onSlideChange={updateDim}
          onResize={updateDim}
        >
          {/*  Card round 1   */}
          {trendingData.map((item) => {
            return (
              <>
                <SwiperSlide className="trending-card" key={item.id}>
                  <article className="trending-card">
                    <Link
                      className="trending-card__link"
                      to={`/findStores?query=${item.animal}`}
                    >
                      <div className="trending-card__circle">
                        <img
                          className="trending-card__img"
                          src={item.img}
                          alt={item.animal}
                        />
                      </div>
                      <div className="trending-card__plate">
                        <div className="trending-card__name">{item.animal}</div>
                        <div className="trending-card__count">
                          {item.searchNum}項搜尋結果
                        </div>
                      </div>
                    </Link>
                  </article>
                </SwiperSlide>
              </>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}
