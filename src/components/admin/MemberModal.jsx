import { useEffect, useState } from 'react';

// utils
// import { getPasswordStrength } from '@/utils/auth';

import { AREA_OPTIONS, PET_TYPE_OPTIONS } from '@/constants/storeOptions';

const MemberModal = ({
  isOpen,
  onClose,
  modalMode,
  tempMember,
  modalError,
  onPetTypeChange,
  onModalChange,
  onConfirm,
}) => {
  // closing：用來控制「關閉動畫期間」是否保留 DOM
  // 當 isOpen 變成 false 時，我們不立刻卸載元件
  // 而是讓 closing = true，保留 300ms 給 fade-out 動畫
  // 動畫結束後才把 closing 設回 false，讓元件真正卸載
  const [closing, setClosing] = useState(false);
  // 只要正在開啟（isOpen）或正在關閉動畫（closing），就保留 DOM
  const shouldRender = isOpen || closing;

  useEffect(() => {
    if (isOpen) {
      // 開啟 modal：加上 body class 並確保不是 closing 狀態
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
      id="productModal"
      className={`modal fade ${isOpen ? 'show d-block' : ''}`}
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
    >
      <div className="modal-dialog modal-dialog-centered modal-xl">
        <div className="modal-content border-0 shadow">
          <div className="modal-header border-bottom">
            <h5 className="modal-title fs-4">
              {modalMode === 'create'
                ? '新增會員資料'
                : '編輯會員資料 - ' + tempMember.userName}
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
                  <label htmlFor="userName" className="form-label">
                    會員名稱
                  </label>
                  <input
                    value={tempMember.userName}
                    onChange={onModalChange}
                    name="userName"
                    id="userName"
                    type="text"
                    className="form-control"
                    placeholder="請輸入會員名稱"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    email
                  </label>
                  <input
                    value={tempMember.email}
                    onChange={onModalChange}
                    name="email"
                    id="email"
                    type="text"
                    className="form-control"
                    placeholder="請輸入會員email"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    password
                  </label>
                  <input
                    value={tempMember.password || ''}
                    onChange={onModalChange}
                    name="password"
                    type="password"
                    className="form-control"
                    placeholder={
                      modalMode === 'edit' ? '不修改請留空' : '請輸入密碼'
                    }
                  />
                  {modalMode === 'edit' && (
                    <small className="text-muted">若不修改密碼請留空</small>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="bio" className="form-label">
                    個人簡介：
                  </label>
                  <textarea
                    className="form-control"
                    name="bio"
                    value={tempMember.bio}
                    onChange={onModalChange}
                    placeholder="請輸入個人簡介"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="location" className="form-label">
                    所在地：
                  </label>
                  <select
                    className="form-select"
                    name="location"
                    value={tempMember.location}
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
                  <label htmlFor="favoritePetTypes" className="form-label">
                    喜好寵物：
                  </label>

                  <div className="d-flex flex-wrap gap-2 mt-2">
                    {PET_TYPE_OPTIONS.map((type, index) => {
                      const isChecked =
                        tempMember.favoritePetTypes?.includes(type);

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

                <div className="form-check">
                  <input
                    checked={Boolean(tempMember.isActive)}
                    onChange={onModalChange}
                    name="isActive"
                    type="checkbox"
                    className="form-check-input"
                    id="isActive"
                  />
                  <label className="form-check-label" htmlFor="isActive">
                    是否會員權限啟用
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

export default MemberModal;
