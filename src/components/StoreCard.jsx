import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'react-feather';
// assets
import ClinicImg from '@/assets/img/clinic.png';
import ShopImg from '@/assets/img/Shop.png';
import HotelImg from '@/assets/img/hotel.png';

// 輔助函式：根據店家類型給圖片
const getStoreImage = (types) => {
  // types 可能是字串或陣列，API通常回傳陣列
  const typeStr = Array.isArray(types) ? types.join('') : types || '';
  if (typeStr.includes('診所') || typeStr.includes('醫院')) return ClinicImg;
  if (typeStr.includes('旅館') || typeStr.includes('住宿')) return HotelImg;
  return ShopImg; // 預設為商店
};

const StoreCard = React.memo(
  ({ store, isFavorite, onToggleFavorite }) => {
    //接收 API 資料
    if (!store) return null;
    // 整理資料：處理 API 欄位與 UI 顯示的對應
    const displayImage = getStoreImage(store.type);
    const displayTypes = Array.isArray(store.type)
      ? store.type.join(' / ')
      : store.type;
    // 假設 API 有 likes 欄位，沒有則預設 0
    const displayLikes = store.likes || 0;

    return (
      <>
        <Link to={`/storedetail/${store.id}`} className="col-6 col-lg-4">
          <div className="card card-style h-100">
            <div className="love">
              {/* <button type="button">
              <Heart className="feather" />
            </button> */}
              {/* e.preventDefault(); 避免 Link 跳轉） */}
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onToggleFavorite(store.id);
                }}
              >
                <Heart className={`feather ${isFavorite ? 'is-fav' : ''}`} />
              </button>
              <span>{displayLikes}</span>
            </div>
            <div className="card-img mb-24">
              <img src={displayImage} alt={`${store.storeName}照片`} />
            </div>
            <div className="cardName mb-12 text-center text-lg-start">
              <span>{store.storeName}</span>
            </div>
            <div className="industry mb-6 text-center text-lg-start">
              <span className="d-none d-lg-inline">店家類型：</span>
              <span>{displayTypes}</span>
            </div>
            <div className="area text-center text-lg-start">
              <span className="d-none d-lg-inline">地區：</span>
              <span>{store.area}</span>
            </div>
          </div>
        </Link>
      </>
    );
  },
  (prev, next) => {
    return (
      prev.store.id === next.store.id && prev.isFavorite === next.isFavorite
    );
  }
);

export default StoreCard;
