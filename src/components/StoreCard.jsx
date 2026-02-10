import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Heart } from 'react-feather';
//假資料
const StoreCardData = [
  {
    id: 1,
    name: '侏羅紀野生動物專科醫院',
    type: '診所',
    location: '台中市西區',
    likes: 153,
    img: '/src/assets/img/clinic.png', // 對應診所圖片
  },
  {
    id: 2,
    name: '蘇龜圓-專業龜類繁殖',
    type: '合法店家',
    location: '新北市林口區',
    likes: 153,
    img: '/src/assets/img/Shop.png', // 對應商店圖片
  },
  {
    id: 3,
    name: '鸚鵡小木屋',
    type: '旅館/合法店家',
    location: '新北市蘆洲區',
    likes: 153,
    img: '/src/assets/img/hotel.png', // 對應旅館圖片
  },
  {
    id: 4,
    name: '躺平守宮',
    type: '旅館/合法店家',
    location: '新北市新莊區',
    likes: 153,
    img: '/src/assets/img/Shop.png', // 圖片看起來像商店 (PET SHOP)
  },
  {
    id: 5,
    name: '凡賽爾賽鴿動物醫院',
    type: '診所',
    location: '台中市西屯區',
    likes: 87,
    img: '/src/assets/img/clinic.png',
  },
  {
    id: 6,
    name: '水手兩樓爬蟲.特寵-南港店',
    type: '合法店家',
    location: '台北市南港區',
    likes: 153,
    img: '/src/assets/img/Shop.png',
  },
  {
    id: 7,
    name: '鼠來寶麻糬屋',
    type: '合法店家',
    location: '台北市北投區',
    likes: 153,
    img: '/src/assets/img/Shop.png',
  },
  {
    id: 8,
    name: '秘境野生動物專科醫院',
    type: '診所',
    location: '新竹縣竹北市',
    likes: 153,
    img: '/src/assets/img/clinic.png',
  },
  {
    id: 9,
    name: '豬寶窩窩',
    type: '旅館',
    location: '新竹縣竹北市',
    likes: 153,
    img: '/src/assets/img/hotel.png',
  },
];
const StoreCard = ({ name, type, area, likes, imgSrc }) => {
  return (
    <>
      {StoreCardData.map((item) => (
        <Link className="col-6 col-lg-4">
          <div className=" card card-style">
            <div className="love">
              <button type="button">
                <Heart className="feather" />
              </button>
              <span>{item.likes}</span>
            </div>
            <div className="card-img mb-24">
              <img src={item.img} alt="" />
            </div>
            <div className="cardName mb-12 text-center text-lg-start">
              <span>{item.name}</span>
            </div>
            <div className="industry mb-6 text-center text-lg-start">
              <span className="d-none d-lg-inline">店家類型：</span>
              <span>{item.type}</span>
            </div>
            <div className="area text-center text-lg-start">
              <span className="d-none d-lg-inline">地區：</span>
              <span>{item.location}</span>
            </div>
          </div>
        </Link>
      ))}
      <nav
        className="ui-pagination justify-content-center"
        aria-label="Pagination"
      >
        <button
          className="ui-pagination__item ui-pagination__item--prev"
          aria-label="Previous page"
        >
          <ChevronLeft />
        </button>
        <button className="ui-pagination__item is-active">1</button>
        <button className="ui-pagination__item " aria-current="page">
          2
        </button>
        <button className="ui-pagination__item">3</button>
        <button
          className="ui-pagination__item ui-pagination__item--next"
          aria-label="Next page"
        >
          <ChevronRight />
        </button>
      </nav>
    </>
  );
};

export default StoreCard;
