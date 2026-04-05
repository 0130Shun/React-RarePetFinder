import { useState, useEffect } from 'react';

// services
import { adminService } from '@/services/adminService';
// components
import FullPageLoader from '@/components/shared/FullPageLoader';
import Pagination from '@/components/shared/Pagination';
import MemberModal from '@/components/admin/MemberModal';
// hook;
import { useToast } from '@/hooks/useToast';
import { usePagination } from '@/hooks/usePagination';
// utils
import { extractErrorMessage } from '@/utils/errorHandler';
// constants
import { DEFAULT_MEMBER } from '@/constants/adminDefaultData';

const Members = () => {
  const { showError, success } = useToast();
  const { getMembers, registerMembers, updateMember } = adminService;

  // 狀態管理 (State)
  const [members, setMembers] = useState([]);
  const [currentMembers, setCurrentMembers] = useState([]);
  const [isScreenLoading, setIsScreenLoading] = useState(false);
  // 管理 Modal元件開關
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
  // Modal 錯誤訊息狀態
  const [modalError, setModalError] = useState('');
  // 資料狀態
  const [tempMember, setTempMember] = useState(DEFAULT_MEMBER);
  const [modalMode, setModalMode] = useState(null);
  // 分頁相關狀態和函式
  const {
    currentPage,
    totalPages,
    pageSize,
    setPageSize, // 使用這個
    getCurrentData,
    goToPage,
  } = usePagination(members.length, 10);

  // Modal表單
  const handleModalInputChange = (e) => {
    const { name, value, checked, type } = e.target;

    setTempMember((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value.trimStart(), // 避免奇怪空白
    }));
  };
  // Modal 控制
  const normalizeMember = (m = {}) => ({
    ...DEFAULT_MEMBER,
    ...m,
    favoritePetTypes: m.favoritePetTypes || [],
  });

  const handlePetTypeChange = (type) => {
    setTempMember((prev) => {
      const exists = prev.favoritePetTypes.includes(type);

      return {
        ...prev,
        favoritePetTypes: exists
          ? prev.favoritePetTypes.filter((item) => item !== type)
          : [...prev.favoritePetTypes, type],
      };
    });
  };

  // MemberModal
  const handleOpenMemberModal = (mode, member = DEFAULT_MEMBER) => {
    setModalError('');
    setModalMode(mode);

    if (mode === 'create') {
      setTempMember({ ...DEFAULT_MEMBER });
    } else {
      const normalized = normalizeMember(member);

      setTempMember({
        ...normalized,
        password: '', // 安全考量，edit時不帶入密碼
      });
    }
    setIsMemberModalOpen(true);
  };

  // 傳值data時，需包裝成物件{data: {}}，
  // 做前端驗證函式 - 確保必填欄位都有填寫，並回傳對應的錯誤訊息
  const validateMember = (member) => {
    if (!member.email) return '請輸入會員email';

    if (modalMode === 'create' && !member.password) {
      return '請輸入密碼';
    }

    return null;
  };

  // 更新會員 - 包含前端驗證、錯誤訊息顯示
  const handleUpdateMember = async () => {
    setIsScreenLoading(true);
    setModalError('');
    const validationError = validateMember(tempMember);

    if (validationError) {
      setModalError(validationError);
      setIsScreenLoading(false);
      return;
    }

    try {
      if (modalMode === 'create') {
        // create 一定要 password
        if (!tempMember.password) {
          setModalError('請輸入密碼');
          showError('請輸入密碼');
          return;
        }
        const now = new Date();
        await registerMembers({
          ...tempMember,
          createdAt: now,
          isActive: true, // 新增的會員預設為啟用狀態
        });
      } else {
        // edit：安全處理 password
        // await updateMember(tempMember.id, tempMember);
        const updateData = { ...tempMember };
        // edit：沒輸入就不要送
        if (!updateData.password) {
          delete updateData.password;
        }
        // edit：favoritePetTypes 前端驗證 - 確保是陣列
        if (!Array.isArray(updateData.favoritePetTypes)) {
          updateData.favoritePetTypes = [];
        }

        await updateMember(tempMember.id, updateData);
      }

      success(`會員資料${modalMode === 'create' ? '新增' : '編輯'}成功`);
      // 成功後重新載入會員列表、分頁重置到第一頁
      const members = await getMembers();
      setMembers(members);
      goToPage(1); // 重置到第一頁
      const currentData = getCurrentData(members);
      setCurrentMembers(currentData);
      setIsMemberModalOpen(false); // 成功才關閉 Modal
    } catch (error) {
      const errorMessage = extractErrorMessage(
        error,
        null,
        '會員資料操作失敗。'
      );
      showError(errorMessage);
    } finally {
      setIsScreenLoading(false);
    }
  };

  // 初次載入 + 每次 stores 改變時更新目前顯示的資料
  useEffect(() => {
    const currentData = getCurrentData(members);
    setCurrentMembers(currentData);
  }, [members, currentPage, pageSize, getCurrentData]);
  // 初次會員列表載入
  useEffect(() => {
    const loadMembers = async () => {
      setIsScreenLoading(true);

      try {
        const members = await getMembers();
        setMembers(members);
      } catch (error) {
        const errorMessage = extractErrorMessage(
          error,
          null,
          '會員 資料載入失敗，請稍後重新刷新。'
        );
        showError(errorMessage);
      } finally {
        setIsScreenLoading(false);
      }
      setIsScreenLoading(false);
    };

    loadMembers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="admin-page">
        <div className="admin-card mb-4">
          <div className="admin-card__header">
            <h2>會員 管理</h2>
            <button
              className="btn btn-primary"
              onClick={() => {
                handleOpenMemberModal('create');
              }}
            >
              新增會員
            </button>
          </div>
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>會員編號</th>
                  <th>會員名稱</th>
                  <th>會員email</th>
                  <th>會員角色</th>
                  <th>啟用狀態</th>
                  <th>功能操作</th>
                </tr>
              </thead>
              <tbody>
                {currentMembers.map((member) => {
                  return (
                    <tr key={member.id}>
                      <td>{member.id}</td>
                      <td>{member.userName}</td>
                      <td>{member.email}</td>
                      <td>{member.role}</td>
                      <td>
                        {member.isActive ? (
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
                              handleOpenMemberModal('edit', member);
                            }}
                            className="btn btn-outline-primary btn-sm"
                          >
                            編輯
                          </button>
                          {/* <button
                            type="button"
                            onClick={() => {
                              handleOpenDeleteModal(product);
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
      </div>

      <MemberModal
        isOpen={isMemberModalOpen}
        onClose={() => setIsMemberModalOpen(false)}
        modalMode={modalMode}
        tempMember={tempMember}
        modalError={modalError}
        onPetTypeChange={handlePetTypeChange}
        onModalChange={handleModalInputChange}
        onConfirm={handleUpdateMember}
      />
      {/* ScreenLoading */}
      <FullPageLoader show={isScreenLoading} zIndex={2000} />
    </>
  );
};

export default Members;
