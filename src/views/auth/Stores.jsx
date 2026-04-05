import { useState, useEffect } from 'react';

// services
import { adminService } from '@/services/adminService';
// components
import FullPageLoader from '@/components/shared/FullPageLoader';
import Pagination from '@/components/shared/Pagination';
import StoreModal from '@/components/admin/StoreModal';
import DeleteModal from '@/components/admin/DeleteModal';
// hook;
import { useToast } from '@/hooks/useToast';
import { usePagination } from '@/hooks/usePagination';
import { useGeocode } from '@/hooks/useGeocode';
// utils
import { extractErrorMessage } from '@/utils/errorHandler';
// constants
import { DEFAULT_STORE } from '@/constants/adminDefaultData';
// config
import { STORE_TYPE_ICON_MAP, PET_ICON_MAP } from '@/config/iconMap';

const Stores = () => {
  const { showError, success } = useToast();
  const { getStores, createStore, updateStore, deleteStore } = adminService;
  const { geocode } = useGeocode();

  // 先宣告所有 state
  const [stores, setStores] = useState([]);
  const [currentStores, setCurrentStores] = useState([]);
  const [isScreenLoading, setIsScreenLoading] = useState(false);
  // 管理 Modal元件開關
  const [isStoreModalOpen, setIsStoreModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  // Modal 錯誤訊息狀態
  const [modalError, setModalError] = useState('');
  // 資料狀態
  const [tempStore, setTempStore] = useState(DEFAULT_STORE);
  const [modalMode, setModalMode] = useState(null);
  // 分頁相關狀態和函式
  const {
    currentPage,
    totalPages,
    pageSize,
    setPageSize, // 使用這個
    getCurrentData,
    goToPage,
  } = usePagination(stores.length, 10);

  // Modal表單
  const handleModalInputChange = (e) => {
    const { name, value, checked, type } = e.target;

    setTempStore((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value.trimStart(), // 避免奇怪空白
    }));
  };
  // Modal 控制

  const handleStoreTypeChange = (type) => {
    setTempStore((prev) => {
      const exists = prev.type.includes(type);

      return {
        ...prev,
        type: exists
          ? prev.type.filter((item) => item !== type)
          : [...prev.type, type],
      };
    });
  };

  const handleStoreGeocode = async (address, storeName) => {
    if (!address || address.trim() === '') {
      showError('請先輸入店家地址');
      return;
    }

    // edit 模式已有座標時先確認
    if (modalMode === 'edit' && tempStore.lat && tempStore.lng) {
      const confirm = window.confirm('已存在定位座標，確定要重新定位嗎？');
      if (!confirm) return;
    }

    // create 模式不帶店名，避免干擾定位；edit 模式才帶店名當輔助
    const effectiveStoreName = modalMode === 'create' ? '' : storeName || '';

    try {
      const geocodedData = await geocode(address, effectiveStoreName);

      if (geocodedData) {
        setTempStore((prev) => ({
          ...prev,
          lat: geocodedData.lat,
          lng: geocodedData.lng,
        }));

        success('地址定位成功！');
      } else {
        showError('無法找到對應座標，請確認地址是否正確，或試試店名 + 地址');
      }
    } catch (error) {
      const errorMessage = extractErrorMessage(
        error,
        null,
        '地址定位失敗，請稍後再試。'
      );
      showError(errorMessage);
    }
  };

  const handlePetTypeChange = (type) => {
    setTempStore((prev) => {
      const exists = prev.petTypes.includes(type);

      return {
        ...prev,
        petTypes: exists
          ? prev.petTypes.filter((item) => item !== type)
          : [...prev.petTypes, type],
      };
    });
  };

  // StoreModal
  const handleOpenStoreModal = (mode, store = DEFAULT_STORE) => {
    setModalError('');
    setModalMode(mode);

    if (mode === 'create') {
      setTempStore({ ...DEFAULT_STORE });
    } else {
      setTempStore({
        ...DEFAULT_STORE, // 先給預設值
        ...store, // 再覆蓋實際資料（lat, lng, storeName 等都會正確覆蓋）
      });
    }
    setIsStoreModalOpen(true);
  };

  const validateStore = (store) => {
    if (!store.storeName) return '請輸入店家名稱';
    if (!store.type) return '請輸入店家類型';
    if (!store.area) return '請輸入店家所在地';
    if (!store.petTypes) return '請輸入店家寵物類型';

    return null;
  };
  // 更新 - 包含前端驗證、錯誤訊息顯示
  const handleUpdateStore = async () => {
    setIsScreenLoading(true);
    setModalError('');
    const validationError = validateStore(tempStore);

    if (validationError) {
      setModalError(validationError);
      setIsScreenLoading(false);
      return;
    }

    try {
      if (modalMode === 'create') {
        const now = new Date();
        await createStore({
          ...tempStore,
          createdAt: now,
          // isActive: true, // 新增店家請用狀態應該由管理者選取
        });
      } else {
        // edit：安全處理 password
        // await updateStore(tempStore.id, tempStore);
        const updateData = { ...tempStore };
        // edit：沒輸入就不要送
        if (!updateData.password) {
          delete updateData.password;
        }
        // edit：favoritePetTypes 前端驗證 - 確保是陣列
        if (!Array.isArray(updateData.favoritePetTypes)) {
          updateData.favoritePetTypes = [];
        }

        await updateStore(tempStore.id, updateData);
      }

      success(`店家資料${modalMode === 'create' ? '新增' : '編輯'}成功`);
      // 成功後重新載入店家列表、分頁重置到第一頁
      const stores = await getStores();
      setStores(stores);
      goToPage(1); // 重置到第一頁
      const currentData = getCurrentData(stores);
      setCurrentStores(currentData);
      setIsStoreModalOpen(false); // 成功才關閉 Modal
      setTempStore(DEFAULT_STORE); // 重置 tempStore
    } catch (error) {
      const errorMessage = extractErrorMessage(
        error,
        null,
        '店家資料操作失敗。'
      );
      showError(errorMessage);
    } finally {
      setIsScreenLoading(false);
    }
  };

  // 刪除店家
  const handleDeleteStore = async () => {
    setIsScreenLoading(true);

    try {
      await deleteStore(tempStore.id);
      await getStores();

      setIsDeleteModalOpen(false);
      success('店家刪除成功！'); // 成功訊息

      // 刪除成功後重新載入店家列表、分頁重置到第一頁
      const stores = await getStores();
      setStores(stores);
      goToPage(1); // 重置到第一頁
      const currentData = getCurrentData(stores);
      setCurrentStores(currentData);
      setTempStore(DEFAULT_STORE); // 重置 tempStore
    } catch (error) {
      const errorMessage = extractErrorMessage(
        error,
        null,
        '刪除店家失敗，請稍後再試。失敗，請稍後再試。'
      );
      showError(errorMessage);
    } finally {
      setIsScreenLoading(false);
    }
  };

  // DeleteModal
  const handleOpenDeleteModal = (store) => {
    setTempStore(store || DEFAULT_STORE);
    setIsDeleteModalOpen(true);
  };

  // 初次載入 + 每次 stores 改變時更新目前顯示的資料
  useEffect(() => {
    const currentData = getCurrentData(stores);
    setCurrentStores(currentData);
  }, [stores, currentPage, pageSize, getCurrentData]);

  // 初次 Stores 列表載入
  useEffect(() => {
    const loadStores = async () => {
      setIsScreenLoading(true);

      try {
        const stores = await getStores();
        setStores(stores);
        const currentData = getCurrentData(stores);
        setCurrentStores(currentData);
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
    };

    loadStores();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="admin-page">
        <div className="admin-card__header">
          <h2>稀寵店家 管理</h2>
          <button
            className="btn btn-primary"
            onClick={() => {
              handleOpenStoreModal('create');
            }}
          >
            新增 稀寵店家
          </button>
        </div>
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>店家編號</th>
                <th style={{ width: '300px' }}>店家名稱</th>
                <th>店家所在地</th>
                <th>店家類型</th>
                <th>店家寵物類型</th>
                <th>啟用狀態</th>
                <th>功能操作</th>
              </tr>
            </thead>
            <tbody>
              {currentStores.map((store) => {
                return (
                  <tr key={store.id}>
                    <td>{store.id}</td>
                    <td>{store.storeName}</td>
                    <td>{store.area}</td>
                    <td>
                      <div className="d-flex align-items-center">
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
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        {store.petTypes.map((pet, i) => (
                          <span
                            key={pet}
                            title={`類型：${pet}`}
                            className="me-2"
                          >
                            {PET_ICON_MAP[pet]}
                            {i < store.petTypes.length - 1 && '、'}
                          </span>
                        ))}
                      </div>
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
                        <button
                          type="button"
                          onClick={() => {
                            handleOpenStoreModal('edit', store);
                          }}
                          className="btn btn-outline-primary btn-sm"
                        >
                          編輯
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            handleOpenDeleteModal(store);
                          }}
                          className="btn btn-outline-danger btn-sm"
                        >
                          刪除
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={goToPage}
            showPageSize={true}
            pageSize={pageSize}
            onPageSizeChange={setPageSize} // ← 直接傳 setPageSize 即
          />
        </div>
      </div>
      <StoreModal
        isOpen={isStoreModalOpen}
        onClose={() => setIsStoreModalOpen(false)}
        modalMode={modalMode}
        tempStore={tempStore}
        modalError={modalError}
        onStoreTypeChange={handleStoreTypeChange}
        onPetTypeChange={handlePetTypeChange}
        onStoreGeocode={handleStoreGeocode}
        onModalChange={handleModalInputChange}
        onConfirm={handleUpdateStore}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        itemTitle={tempStore.storeName}
        onConfirm={handleDeleteStore}
      />

      {/* ScreenLoading */}
      <FullPageLoader show={isScreenLoading} zIndex={2000} />
    </>
  );
};

export default Stores;
