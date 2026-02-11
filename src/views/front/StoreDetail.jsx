// import StoreDetailHero from '../../components/subHero/StoreDetailHero';
import SubHero from '../../components/subHero/SubHero';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { storeService } from '@/api';
import { User, MapPin, Phone, Link as LinkIcon } from 'react-feather';

// 圖片引入
import ShopImg from '@/assets/img/Shop.png';
import HotelImg from '@/assets/img/hotel.png';
import ClinicImg from '@/assets/img/clinic.png';

export default function StoreDetail() {
  // 透過useEffect的await storeService.getStoreDetail(storeId)去讀取資料後，再把資料傳給StoreDetailHero，
  // 這邊暫時用storeData代表實際的store店家物件資料，
  // 未來應該是store+favorite筆數+評論比數混合倒入，測試時請自由刪減type、petTypes
  // const storeData = {
  //   storeName: '柯爾鴨精品休閒館-台中店',
  //   type: ['旅館', '賣家', '診所'],
  //   area: '新北',
  //   petTypes: ['倉鼠', '柯爾鴨', '鸚鵡', '守宮', '刺蝟'],
  // };
  const { storeId } = useParams(); // 1. 抓網址上的 ID
  const [store, setStore] = useState(null); // 2. 存資料的變數
  const [isLoading, setIsLoading] = useState(true); // 3. 載入狀態
  const [error, setError] = useState(null); // 4. 錯誤訊息

  const imageMap = {
    'Shop.png': ShopImg,
    'hotel.png': HotelImg,
    'clinic.png': ClinicImg,
  };
  const getCoverImage = (filename) => {
    // 嘗試去 imageMap 找，如果找不到 (undefined) 就回傳預設圖 ShopImg
    return imageMap[filename] || ShopImg;
  };

  useEffect(() => {
    const fetchStore = async () => {
      setIsLoading(true);
      try {
        // 🔥 這裡記得用你 api.js 定義的名字：getStoreDetail
        const data = await storeService.getStoreDetail(storeId);
        setStore(data);
      } catch (err) {
        console.error(err);
        setError('找不到店家資料');
      } finally {
        setIsLoading(false);
      }
    };

    if (storeId) fetchStore();
  }, [storeId]);

  if (isLoading) return <div className="py-5 text-center">載入中...</div>;
  if (error) return <div className="py-5 text-center text-danger">{error}</div>;
  if (!store) return null;
  return (
    <>
      {/* <StoreDetailHero store={storeData} /> */}
      <SubHero variant="storeDetail" store={store} />

      {/* <h1>檢索頁面</h1> */}
      <section className="container">
        <div className="row store-info-section gap-md-3">
          <div className="col-md-3 store-profile-box mb-4">
            <div className="store-detail-img">
              <img
                src={getCoverImage(store.coverImage)}
                alt={store.storeName}
              />
            </div>
            <div className="store-link">
              <LinkIcon className="store-link-icon" />
              <a href={store.website}>此店家官方線上聯絡管道</a>
            </div>
          </div>
          {/* <!-- 店家公開資訊 --> */}
          <div className="col-md-5 store-info-box mb-4">
            <div className="store-info-content">
              <h4>店家公開資訊</h4>
              <p className=" mb-4">{store.description}</p>
              {/* <ul className="d-flex flex-column gap-1 mb-4">
                <li>{store.description}</li>
              </ul> */}

              <h4>營業時間</h4>
              <ul className="d-flex flex-column gap-1">
                <li>週一 09:00 ~ 19:00</li>
                <li>週二 09:00 ~ 19:00</li>
                <li>週三 09:00 ~ 19:00</li>
                <li>週四 09:00 ~ 19:00</li>
                <li>週五 09:00 ~ 19:00</li>
                <li>週六 公休</li>
                <li>週日 09:00 ~ 19:00</li>
                <li>例假日請見官方公告</li>
              </ul>
            </div>
          </div>

          <div className="col-md-4 store-contact-box d-flex flex-column">
            <div className="store-detail-add d-flex align-items-center gap-4">
              <div className="add-icon">
                <MapPin className="feather" />
              </div>
              <div className="add-text">
                <h4>地址</h4>
                <p>{store.address}</p>
              </div>
            </div>
            <div className="store-tel d-flex align-items-center gap-4 mb-4">
              <div className="tel-icon">
                <Phone className="feather" />
              </div>
              <div className="tel-text">
                <h4>電話</h4>
                <p>{store.phone}</p>
              </div>
            </div>
            <button className="share-btn mb-4 ">我要分享體驗</button>
            <p className="info-disclaimer">
              本平台僅提供資訊，與商家沒有商業合作關係，
              請勿向本平台客訴或詢問商家詳情。
            </p>
          </div>
        </div>
      </section>
      {/* <!-- --- 相關評價 ---  --> */}
      <section className="container-fluid p-0 review-bg">
        <div className="infoSection black-100 container-md-fluid mb-5">
          {/* <!-- 相關評價title --> */}
          <div className="d-flex justify-content-center section-title-outside pb-md-4 mb-3">
            <h2
              className="section-title black-400 pb-4"
              data-en-title="Reviews"
            >
              相關評價
            </h2>
          </div>

          {/* <!-- 相關評價卡片區 --> */}
          <div className="infoContent reviewsContent py-3 px-1 mx-0 mx-md-auto px-md-0 row g-3 g-md-4 py-md-5">
            <div className="col-12 col-md-4">
              <div className="reviewsContentCard p-md-4">
                <h3 className="card-title d-flex align-items-center m-0 mb-3">
                  {/* <i className="userIcon me-4" data-feather="user"></i> 匿名先生 */}
                  <User className="userIcon me-4" />
                  匿名先生
                </h3>
                <p className="card-text black-600">
                  這次帶烏龜入住兩晚，環境比想像中安靜很多，房間溫度也穩定。櫃檯有提醒哪些區域適合讓烏龜
                  短暫活動，感覺蠻貼心的。整體是讓人放心的寵物旅館。
                </p>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="reviewsContentCard p-md-4">
                <h3 className="card-title d-flex align-items-center m-0 mb-3">
                  {/* <i className="userIcon me-4" data-feather="user"></i> 匿名小姐 */}
                  <User className="userIcon me-4" />
                  匿名小姐
                </h3>
                <p className="card-text black-600">
                  帶守宮來檢查時，醫生很細心，會先讓牠適應一下環境才開始檢查。醫療過程不急不躁，解釋也清楚。對特殊寵物非常友善，是會回訪的診所。
                </p>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="reviewsContentCard p-md-4">
                <h3 className="card-title d-flex align-items-center m-0 mb-3">
                  {/* <i className="userIcon me-4" data-feather="user"></i>台北K先生 */}
                  <User className="userIcon me-4" />
                  台北K先生
                </h3>
                <p className="card-text black-600">
                  第一次帶柯爾鴨外宿，原本很擔心牠會不適應，結果店家真的超有經驗。房間有為水禽準備的防水墊，清潔工具也隨時可借。住宿品質好又不用害怕打擾別人，滿意！
                </p>
              </div>
            </div>
            <a
              className="moreInfoBtn black-400 btn mb-4 mt-4 mb-md-0 mt-md-5"
              href="#"
            >
              更多
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
