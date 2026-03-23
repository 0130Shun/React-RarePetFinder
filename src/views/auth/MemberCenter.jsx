import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
// services
import { updateUserApi } from '@/services/userService';
// features
import { setUser } from '@/features/userSlice';
// hook
import { useToast } from '@/hook/useToast';
//components
import SubHero from '@/components/subHero/SubHero';
import FullPageLoader from '@/components/shared/FullPageLoader';
// utils
import { setAuthUser } from '@/utils/auth';
import { handleApiError } from '@/utils/apiErrorHandler';

const PET_OPTIONS = ['柯爾鴨', '鸚鵡', '刺蝟', '倉鼠', '守宮', '烏龜', '爬蟲'];

// Avatar（頭像）代處理
// 社群連結（IG / FB）代處理
// 我的收藏（🔥推薦）代處理
const MemberCenter = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.user.user); // 從state取出會員資料
  const { success, showError, warning } = useToast();
  const [isScreenLoading, setIsScreenLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    userName: user?.userName || '',
    bio: user?.bio || '',
    location: user?.location || '',
    favoritePetTypes: user?.favoritePetTypes || [],
  });
  const AREA_OPTIONS = [
    '',
    '新北',
    '台北',
    '桃園',
    '高雄',
    '台中',
    '台南',
    '嘉義',
    '新竹',
    '屏東',
  ];
  const isDirty =
    JSON.stringify(formData) !==
    JSON.stringify({
      userName: user?.userName || '',
      bio: user?.bio || '',
      location: user?.location || '',
      favoritePetTypes: user?.favoritePetTypes || [],
    });

  // 日期調整
  // const formatDate = (isoString) => {
  //   return new Date(isoString).toLocaleString('zh-TW', {
  //     timeZone: 'Asia/Taipei',
  //   });
  // };
  const formatDate = (isoString) => {
    if (!isoString) return '-';

    const date = new Date(isoString);
    if (isNaN(date)) return '-';

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  // 一般 input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //  checkbox 多選
  const handlePetTypeChange = (type) => {
    setFormData((prev) => {
      const exists = prev.favoritePetTypes.includes(type);

      return {
        ...prev,
        favoritePetTypes: exists
          ? prev.favoritePetTypes.filter((item) => item !== type)
          : [...prev.favoritePetTypes, type],
      };
    });
  };

  //  submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsScreenLoading(true);

    if (!formData.userName) {
      warning('名稱不可為空');
      setIsScreenLoading(false);
      return;
    }

    try {
      // const updatedUser = {
      //   ...user,
      //   ...formData,
      // };

      const updatedUser = await updateUserApi(user.id, formData);

      setAuthUser(updatedUser);
      dispatch(setUser(updatedUser));

      success('會員資料更新成功');
      setIsEditing(false);
    } catch (err) {
      const errorMessage = handleApiError(
        err,
        null,
        '會員資料更新失敗，請重新嘗試。'
      );
      showError(errorMessage);
    } finally {
      setTimeout(() => {
        setIsScreenLoading(false);
      }, 300);
    }
  };

  // handleClickOpen
  // const handleClickOpen = () => {
  //   setOpen(!open);
  // };
  const handleCancel = () => {
    setFormData({
      userName: user?.userName || '',
      bio: user?.bio || '',
      location: user?.location || '',
      favoritePetTypes: user?.favoritePetTypes || [],
    });
    setIsEditing(false);
  };
  const handleToggleEdit = () => {
    if (isEditing) {
      handleCancel();
    } else {
      setIsEditing(true);
    }
  };

  // 日後可以改寫成ProtectedRoute，從 Route 處就先判斷是否可以進入和紀錄路徑 from
  // src/routes/ProtectedRoute.jsx，以下為範例：
  // import { useSelector } from 'react-redux';
  // import { Navigate, useLocation } from 'react-router-dom';

  // const ProtectedRoute = ({ children }) => {
  //   const user = useSelector((state) => state.user.user);
  //   const location = useLocation();

  //   if (!user) {
  //     return (
  //       <Navigate
  //         to="/login"
  //         state={{ from: location }}
  //         replace
  //       />
  //     );
  //   }
  //   return children;
  // };
  // export default ProtectedRoute;

  useEffect(() => {
    // console.log('useEffect triggered');

    if (!user) {
      warning('請先登入帳號後再使用會員中心，即將跳轉到登入頁面。');
      navigate('/login', {
        state: { from: location },
        replace: true,
      });
      return;
    }

    setFormData({
      userName: user.userName || '',
      bio: user.bio || '',
      location: user.location || '',
      favoritePetTypes: user.favoritePetTypes || [],
    });
  }, [user]); ///// eslint-disable-next-line react-hooks/exhaustive-deps

  // if (!user) return <div>請重新登入</div>;

  return (
    <>
      <SubHero variant="memberCenter" />
      <section className="container ui-container mt-5">
        <div className="row g-0">
          {/* 左側：會員資訊 */}
          <aside className="col-lg-4 col-12">
            <div className="member-card p-3 shadow-sm">
              <h2 className="mb-3 text-center">會員資訊</h2>
              <div className="w-75 mx-auto mb-3">
                <p className="text-start">Email：{user.email}</p>
                <p className="text-start">角色：{user.role}</p>
                <p className="text-start">
                  註冊時間：{formatDate(user.createdAt)}
                </p>
              </div>
              <div className="text-center mb-3">
                <button
                  className="btn ui-btn ui-btn-warning w-50"
                  onClick={() => {
                    handleToggleEdit();
                  }}
                >
                  {isEditing ? '取消編輯' : '編輯資料'}
                </button>
              </div>
            </div>
          </aside>

          {/* 右側：表單 */}

          <main className="col-lg-8 col-12">
            <div className="member-form shadow-sm p-3">
              <h2 className="mb-4 text-lg-start  text-center">編輯個人資料</h2>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">使用者名稱</label>
                  <input
                    className="form-control"
                    type="text"
                    name="userName"
                    value={formData.userName}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">個人簡介</label>
                  <textarea
                    className="form-control"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">所在地</label>

                  <select
                    className="form-select"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    disabled={!isEditing}
                  >
                    <option value="">請選擇縣市</option>
                    {AREA_OPTIONS.filter((a) => a !== '').map((a) => (
                      <option key={a} value={a}>
                        {a}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label className="form-label">喜好寵物</label>
                  <div className="d-flex flex-wrap gap-2 mt-2">
                    {PET_OPTIONS.map((type) => {
                      const isChecked =
                        formData.favoritePetTypes.includes(type);
                      return (
                        <div
                          key={type}
                          className={`petType-checkbox ${isChecked ? 'checked' : ''}`}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            disabled={!isEditing}
                            onChange={() => handlePetTypeChange(type)}
                          />
                          <span>{type}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {isEditing && (
                  <>
                    <span className="text-danger">
                      * 帳號資料有異動才可以點選送出
                    </span>
                    <button
                      type="submit"
                      className="btn ui-btn ui-btn-primary w-100"
                      disabled={isScreenLoading || !isDirty}
                    >
                      儲存變更
                    </button>
                  </>
                )}
              </form>
            </div>
          </main>
        </div>
      </section>
      {/* ScreenLoading */}
      <FullPageLoader show={isScreenLoading} zIndex={2000} />
    </>
  );
};

export default MemberCenter;
