import { useState, useEffect } from 'react';

// services
import { adminService } from '@/services/adminService';
// components
import FullPageLoader from '@/components/shared/FullPageLoader';
import StoreModal from '@/components/admin/StoreModal';
// hook;
import { useToast } from '@/hooks/useToast';
// utils
import { extractErrorMessage } from '@/utils/errorHandler';
// constants
import { DEFAULT_STORE } from '@/constants/adminDefaultData';
// config
import { STORE_TYPE_ICON_MAP, PET_ICON_MAP } from '@/config/iconMap';

const Stores = () => {
  // const { showError, success } = useToast();
  const { showError } = useToast();
  // const { getStores, createStore, updateStore } = adminService;
  const { getStores } = adminService;

  // 狀態管理 (State)
  const [stores, setStores] = useState([]);
  const [isScreenLoading, setIsScreenLoading] = useState(false);
  // 管理 Modal元件開關
  // const [isStoreModalOpen, setIsStoreModalOpen] = useState(false);
  // Modal 錯誤訊息狀態
  // const [modalError, setModalError] = useState('');
  // 資料狀態
  // const [tempStore, setTempStore] = useState(DEFAULT_STORE);
  // const [modalMode, setModalMode] = useState(null);

  // 初次Stores列表載入
  useEffect(() => {
    const loadStores = async () => {
      setIsScreenLoading(true);

      try {
        const stores = await getStores();
        setStores(stores);
      } catch (error) {
        const errorMessage = extractErrorMessage(
          error,
          null,
          '店家 資料載入失敗，請稍後重新刷新。'
        );
        showError(errorMessage);
      } finally {
        setIsScreenLoading(false);
      }
      setIsScreenLoading(false);
    };

    loadStores();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="admin-page">
        <div className="admin-card__header">
          <h2>稀寵店家 管理</h2>
          {/* <button
            className="btn btn-primary"
            onClick={() => {
              handleOpenStoreModal('create');
            }}
          >
            新增 稀寵店家
          </button> */}
        </div>
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>店家編號</th>
                <th>店家名稱</th>
                <th>店家所在地</th>
                <th>店家類型</th>
                <th>店家寵物類型</th>
                <th>啟用狀態</th>
                <th>功能操作</th>
              </tr>
            </thead>
            <tbody>
              {stores.map((store) => {
                return (
                  <tr key={store.id}>
                    <td>{store.id}</td>
                    <td>{store.name}</td>
                    <td>{store.area}</td>
                    <td>
                      {store.type.map((typeItem, i) => {
                        const Icon = STORE_TYPE_ICON_MAP[typeItem];
                        if (!Icon) return null;
                        return (
                          <span
                            key={typeItem}
                            title={`類型：${typeItem}`}
                            className="ui-subHero__meta-item d-flex align-items-center"
                          >
                            <Icon size={20} className="me-1" />
                            {typeItem}
                            {i < store.type.length - 1 && '、'}
                          </span>
                        );
                      })}
                    </td>
                    <td>
                      {store.petTypes.map((pet, i) => (
                        <span key={pet} title={`類型：${pet}`} className="me-2">
                          {PET_ICON_MAP[pet]}
                          {i < store.petTypes.length - 1 && '、'}
                        </span>
                      ))}
                    </td>
                    <td>
                      {store.isActive ? (
                        <span className="badge bg-success">啟用</span>
                      ) : (
                        <span className="badge bg-secondary">未啟用</span>
                      )}
                    </td>
                    <td>
                      <div className="btn-group">
                        {/* <button
                          type="button"
                          onClick={() => {
                            handleOpenStoreModal('edit', store);
                          }}
                          className="btn btn-outline-primary btn-sm"
                        >
                          編輯
                        </button> */}
                        {/* <button
                            type="button"
                            onClick={() => {
                              handleOpenDeleteModal(store);
                            }}
                            className="btn btn-outline-danger btn-sm"
                          >
                            刪除
                          </button> */}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {/* ScreenLoading */}
      <FullPageLoader show={isScreenLoading} zIndex={2000} />
    </>
  );
};

export default Stores;
