import { Swiper, SwiperSlide } from 'swiper/react'; // 引入 Swiper React 元件
import { Pagination, Autoplay, Navigation } from 'swiper/modules'; // 引入模組
import { Heart, ArrowLeft, ArrowRight, Search } from 'react-feather';
const HotSpot = () => {
  return (
    <>
      <div className="hotSpot container-md-fluid mb-md-5">
        <div className="d-flex justify-content-center section-title-outside pb-md-4">
          <h2
            className="section-title text-center pb-4 primary-yellow"
            data-en-title="Hot Spot"
          >
            熱門店家
          </h2>
        </div>
        {/* <div className="swiper mySwiper hotSpot-content py-4 py-md-5"> */}
        <Swiper
          // 綁定模組
          modules={[Navigation, Autoplay, Pagination]}
          // 你的參數設定
          centeredSlides={true}
          slidesPerView={2}
          spaceBetween={24}
          loop={true}
          autoplay={{ delay: 300000, disableOnInteraction: false }}
          // 下面的小黑點(分頁註記)
          // pagination={{ clickable: true }}
          // 導航按鈕 (綁定下方的 class)
          navigation={{
            nextEl: '.custom-next',
            prevEl: '.custom-prev',
          }}
          // RWD
          breakpoints={{
            768: {
              centeredSlides: false,
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1400: {
              centeredSlides: false,
              slidesPerView: 4,
              spaceBetween: 24,
            },
          }}
          className="swiper mySwiper hotSpot-content py-4 py-md-5"
        >
          {/* <div className="swiper-wrapper pb-3"> */}
          <SwiperSlide>
            <div className="store-card text-center">
              <div className="d-flex justify-content-end align-items-center mb-3 pe-3">
                {/* <i data-feather="heart" className="fav-icon me-1"></i> */}
                <Heart className="feather fav-icon me-1" size={20} />
                <span className="small fw-bold">153</span>
              </div>
              <div className="icon-box mb-3 mb-md-4 mx-auto d-flex align-items-center justify-content-center">
                <img
                  className="store-img"
                  src="/src/assets/img/hotel.png"
                  alt="店家圖片"
                />
              </div>
              <div className="store-content">
                <p className="store-name mb-2">就甘心Ponpon寵物旅館</p>
                <p className="store-add">台北市中山區新生北路二段60巷16號4樓</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="store-card text-center">
              <div className="d-flex justify-content-end align-items-center mb-3 pe-3">
                <Heart className="feather fav-icon me-1" size={20} />

                {/* <i data-feather="heart" className="fav-icon me-1"></i> */}
                <span className="small fw-bold">87</span>
              </div>
              <div className="icon-box mb-3 mb-md-4 mx-auto d-flex align-items-center justify-content-center">
                <img
                  className="store-img"
                  src="/src/assets/img/clinic.png"
                  alt="店家圖片"
                />
              </div>
              <div className="store-content">
                <p className="store-name mb-2">凡賽爾賽鴿動物醫院</p>
                <p className="store-add">台中市西屯區重慶路8號</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="store-card text-center">
              <div className="d-flex justify-content-end align-items-center mb-3 pe-3">
                <Heart className="feather fav-icon me-1" size={20} />

                {/* <i data-feather="heart" className="fav-icon me-1"></i> */}
                <span className="small fw-bold">93</span>
              </div>
              <div className="icon-box mb-3 mb-md-4 mx-auto d-flex align-items-center justify-content-center">
                <img
                  className="store-img"
                  src="/src/assets/img/Shop.png"
                  alt="店家圖片"
                />
              </div>
              <div className="store-content">
                <p className="store-name mb-2">水手兩棲爬蟲.特寵-南港店</p>
                <p className="store-add">台北市南港區南港路二段20巷5號B1</p>
              </div>{' '}
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="store-card text-center">
              <div className="d-flex justify-content-end align-items-center mb-3 pe-3">
                <Heart className="feather fav-icon me-1" size={20} />

                {/* <i data-feather="heart" className="fav-icon me-1"></i> */}
                <span className="small fw-bold">115</span>
              </div>
              <div className="icon-box mb-3 mb-md-4 mx-auto d-flex align-items-center justify-content-center">
                <img
                  className="store-img"
                  src="/src/assets/img/clinic.png"
                  alt="店家圖片"
                />
              </div>
              <div className="store-content">
                <p className="store-name mb-2">星羽動物醫院-三民院</p>
                <p className="store-add">高雄市三民區信國路20號</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="store-card text-center">
              <div className="d-flex justify-content-end align-items-center mb-3 pe-3">
                <Heart className="feather fav-icon me-1" size={20} />

                {/* <i data-feather="heart" className="fav-icon me-1"></i> */}
                <span className="small fw-bold">75</span>
              </div>
              <div className="icon-box mb-3 mb-md-4 mx-auto d-flex align-items-center justify-content-center">
                <img
                  className="store-img"
                  src="/src/assets/img/hotel.png"
                  alt="店家圖片"
                />
              </div>
              <div className="store-content">
                <p className="store-name mb-2">熊讚寵物精緻旅館</p>
                <p className="store-add">新北市板橋區館前西路120號2樓</p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>{' '}
        <div className="custom-prev swiper-button-prev d-none d-md-flex">
          {/* <i data-feather="arrow-left"></i> */}
          <ArrowLeft className="feather" />
        </div>
        <div className="custom-next swiper-button-next d-none d-md-flex">
          {/* <i data-feather="arrow-right"></i> */}
          <ArrowRight className="feather" />
        </div>
      </div>

      {/* </div> */}
    </>
  );
};

export default HotSpot;
