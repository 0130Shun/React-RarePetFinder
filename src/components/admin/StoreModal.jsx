import { useEffect, useState } from 'react';
import MapViewer from '@/components/shared/MapViewer';

import {
  AREA_OPTIONS,
  STORE_TYPE_OPTIONS,
  PET_TYPE_OPTIONS,
} from '@/constants/storeOptions';

const StoreModal = ({
  isOpen,
  onClose,
  modalMode,
  tempStore,
  modalError,
  onStoreTypeChange,
  onPetTypeChange,
  onStoreGeocode,
  onModalChange,
  onConfirm,
}) => {
  // closing：用來控制「關閉動畫期間」是否保留 DOM
  const [closing, setClosing] = useState(false);
  // 只要正在開啟（isOpen）或正在關閉動畫（closing），就保留 DOM
  const shouldRender = isOpen || closing;

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open');
      return;
    }

    // 當 isOpen(開始關閉Modal) 變成 false 時，啟動 closing 動畫
    if (!isOpen && shouldRender) {
      document.body.classList.remove('modal-open');
      setTimeout(() => {
        setClosing(true);
      }, 0);

      // 給 Bootstrap fade-out 300ms 時間
      const timer = setTimeout(() => {
        setClosing(false);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [isOpen, shouldRender]);

  // 如果既沒有開啟，也沒有在 closing 動畫中 → 不渲染
  if (!shouldRender) return null;

  return (
    <div
      id="storeModal"
      className={`modal fade ${isOpen ? 'show d-block' : ''}`}
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content border-0 shadow">
          <div className="modal-header border-bottom">
            <h5 className="modal-title fs-4">
              {modalMode === 'create'
                ? '新增稀寵店家資料'
                : '編輯稀寵店家資料 - ' + tempStore.storeName}
            </h5>
            <button
              type="button"
              onClick={onClose}
              className="btn-close"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body p-4">
            {modalError && (
              <div className="alert alert-danger">{modalError}</div>
            )}
            <div className="row g-4">
              <div className="col-md-12">
                <div className="mb-3">
                  <label htmlFor="storeName" className="form-label">
                    店家名稱
                  </label>
                  <input
                    value={tempStore.storeName}
                    onChange={onModalChange}
                    name="storeName"
                    id="storeName"
                    type="text"
                    className="form-control"
                    placeholder="請輸入店家名稱"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="storeType" className="form-label">
                    店家商業類型：
                  </label>

                  <div className="d-flex flex-wrap gap-2 mt-2">
                    {STORE_TYPE_OPTIONS.map((typeItem, index) => {
                      const isChecked = tempStore.type?.includes(typeItem);

                      return (
                        <label
                          key={`${typeItem}-${index}`}
                          className={`petType-checkbox ${isChecked ? 'checked' : ''}`}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => onStoreTypeChange(typeItem)}
                            hidden
                          />
                          <span>{typeItem}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="area" className="form-label">
                    所在地：
                  </label>
                  <select
                    className="form-select"
                    name="area"
                    value={tempStore.area}
                    onChange={onModalChange}
                  >
                    <option value="">請選擇縣市</option>
                    {AREA_OPTIONS.filter((a) => a !== '').map((a) => (
                      <option key={a} value={a}>
                        {a}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="petTypes" className="form-label">
                    店家寵物類型：
                  </label>

                  <div className="d-flex flex-wrap gap-2 mt-2">
                    {PET_TYPE_OPTIONS.map((type, index) => {
                      const isChecked = tempStore.petTypes?.includes(type);

                      return (
                        <label
                          key={`${type}-${index}`}
                          className={`petType-checkbox ${isChecked ? 'checked' : ''}`}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => onPetTypeChange(type)}
                            hidden
                          />
                          <span>{type}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    店家簡介：
                  </label>
                  <textarea
                    className="form-control"
                    name="description"
                    value={tempStore.description}
                    onChange={onModalChange}
                    placeholder="請輸入店家簡介"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">
                    電話
                  </label>
                  <input
                    value={tempStore.phone}
                    onChange={onModalChange}
                    name="phone"
                    id="phone"
                    type="text"
                    className="form-control"
                    placeholder="請輸入店家電話"
                  />
                </div>

                {/* openTime欄位，再想想怎麼呈現也需要調整前後台UI設計 */}
                {/* <div className="mb-3">
                  <label htmlFor="openTime" className="form-label">
                    開業時間
                  </label>
                  <input
                    value={tempStore.openTime}
                    onChange={onModalChange}
                    name="openTime"
                    id="openTime"
                    type="text"
                    className="form-control"
                    placeholder="請輸入店家開業時間"
                  />
                </div> */}

                {/* coverImage欄位，先讓管理員填寫圖片網址，
                等確定前台圖片上傳功能的使用方式後再決定是否開放給店家自行上傳圖片 */}
                {/* <div className="mb-3">
                  <label htmlFor="coverImage" className="form-label">
                    店家封面圖片
                  </label>
                  <input
                    value={tempStore.coverImage}
                    onChange={onModalChange}
                    name="coverImage"
                    id="coverImage"
                    type="coverImage"
                    className="form-control"
                    placeholder="請輸入店家封面圖片網址"
                  />
                </div> */}

                <div className="mb-3">
                  <label htmlFor="website" className="form-label">
                    店家網站/社群連結
                  </label>
                  <input
                    value={tempStore.website}
                    onChange={onModalChange}
                    name="website"
                    id="website"
                    type="text"
                    className="form-control"
                    placeholder="請輸入店家網站/社群連結"
                  />
                </div>
                {/* 店家提供googleMapUrl欄位，先隱藏，等確定前台Google Map
                API的使用方式後再決定是否開放給店家填寫 */}
                {/* <div className="mb-3">
                  <label htmlFor="googleMapUrl" className="form-label">
                    店家提供googleMapUrl
                  </label>
                  <input
                    value={tempStore.googleMapUrl}
                    onChange={onModalChange}
                    name="googleMapUrl"
                    id="googleMapUrl"
                    type="text"
                    className="form-control"
                    placeholder="請輸入店家主動提供的googleMapUrl"
                  />
                </div> */}
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">
                    店家地址
                    {/* （由後台管理員填寫，提供給前台使用者辨識店家位置，並用於Google
                    Map API轉換座標） */}
                  </label>
                  <input
                    value={tempStore.address}
                    onChange={onModalChange}
                    name="address"
                    id="address"
                    type="text"
                    className="form-control"
                    placeholder="請輸入店家地址"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      onStoreGeocode(tempStore.address, tempStore.storeName)
                    }
                    className="btn btn-primary"
                  >
                    地址定位
                  </button>
                </div>

                <div className="mb-4">
                  <label className="form-label fw-bold">店家定位地圖</label>

                  {/* 座標顯示（小字） */}
                  <div className="mb-2 text-muted small">
                    座標：
                    <span>lat: {tempStore.lat ?? '尚未定位'}</span> {'、'}
                    <span>lng: {tempStore.lng ?? '尚未定位'}</span>
                  </div>

                  {/* 其他頁面如何通用 StoreMap 元件範例 */}
                  {/* <MapViewer
                    lat={yourLat}
                    lng={yourLng}
                    storeName="我的店家名稱"
                    height="380px" // 不同頁面想要不同高度就改這裡
                    zoom={15}
                    className="my-custom-map" // 可以透過 scss 針對這個 class 做特別調整
                  /> */}
                  <MapViewer
                    className="shadow-sm admin-store-map" // 可傳 className 做額外樣式
                    lat={tempStore.lat}
                    lng={tempStore.lng}
                    storeName={tempStore.storeName}
                    height="420px" // 這裡可以改成想要的高度
                    zoom={17} // 可調整預設縮放等級
                  />

                  {/* 小提醒文字 */}
                  <div className="mt-2 text-muted small">
                    ※ 點擊「地址定位」後，地圖會自動更新位置
                  </div>
                </div>

                <div className="form-check">
                  <input
                    checked={Boolean(tempStore.isActive)}
                    onChange={onModalChange}
                    name="isActive"
                    type="checkbox"
                    className="form-check-input"
                    id="isActive"
                  />
                  <label className="form-check-label" htmlFor="isActive">
                    是否啟用店家
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="modal-footer border-top bg-light">
            <button
              type="button"
              onClick={onConfirm}
              className="btn btn-primary"
            >
              確認
            </button>
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary"
            >
              取消
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreModal;
