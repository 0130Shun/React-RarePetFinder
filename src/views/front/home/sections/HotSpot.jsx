import { Swiper, SwiperSlide } from 'swiper/react'; // 引入 Swiper React 元件
import { Pagination, Autoplay, Navigation } from 'swiper/modules'; // 引入模組
import { Heart, ArrowLeft, ArrowRight, Search } from 'react-feather';
import { Link, NavLink } from 'react-router-dom';

import hotelImg from '@/assets/img/hotel.png';
import clinicImg from '@/assets/img/clinic.png';
import shopImg from '@/assets/img/Shop.png';
const HotSpot = () => {
  const hotSpotData = [
    {
      id: 1,
      storeName: '玄武棲兩棲爬蟲概念館',
      address: '新北市新莊區中正路637巷28號',
      likes: 153,
      img: hotelImg, // 記得確認圖片路徑是否正確
      num: 15,
    },
    {
      id: 2,
      storeName: '凡賽爾賽鴨寵物鳥醫院(大同店)',
      address: '台北市大同區民族西路53號',
      likes: 87,
      img: clinicImg,
      num: 4,
    },
    {
      id: 3,
      storeName: '水手兩棲爬蟲.特寵-南港店',
      address: '台北市南港區南港路二段20巷5號B1',
      likes: 93,
      img: shopImg,
      num: 11,
    },
    {
      id: 4,
      storeName: '星羽動物醫院-三民院',
      address: '高雄市三民區信國路20號',
      likes: 115,
      img: clinicImg,
      num: 23,
    },
    {
      id: 5,
      storeName: '熊讚寵物精緻旅館',
      address: '新北市板橋區館前西路120號2樓',
      likes: 75,
      img: hotelImg,
      num: 69,
    },
  ];

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
        <Swiper
          // 綁定模組
          modules={[Navigation, Autoplay, Pagination]}
          // 你的參數設定
          centeredSlides={true}
          slidesPerView={2}
          spaceBetween={24}
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
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
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1000: {
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
          {hotSpotData.map((store) => (
            <SwiperSlide>
              <Link
                key={store.storeName}
                to={`/storedetail/${store.num}`}
                className="d-block store-card text-center"
              >
                <div className="d-flex justify-content-end align-items-center mb-3 pe-3">
                  <Heart className="feather fav-icon me-1" size={20} />
                  <span className="small fw-bold">{store.likes}</span>
                </div>
                <div className="icon-box mb-3 mb-md-4 mx-auto d-flex align-items-center justify-content-center">
                  <img className="store-img" src={store.img} alt="店家圖片" />
                </div>
                <div className="store-content">
                  <p className="store-name mb-2">{store.storeName}</p>
                  <p className="store-add">{store.address}</p>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="custom-prev swiper-button-prev d-none d-md-flex">
          <ArrowLeft className="feather" />
        </div>
        <div className="custom-next swiper-button-next d-none d-md-flex">
          <ArrowRight className="feather" />
        </div>
      </div>
    </>
  );
};

export default HotSpot;
