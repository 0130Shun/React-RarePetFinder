import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// services
import { updateUserApi } from '@/services/userService';
// features
import { setUser } from '@/features/userSlice';
// hook
import { useToast } from '@/hooks/useToast';
//components
import SubHero from '@/components/subHero/SubHero';
import FullPageLoader from '@/components/shared/FullPageLoader';
// utils
import { setAuthUser } from '@/utils/auth';
import { extractErrorMessage } from '@/utils/errorHandler';
import { formatDate } from '@/utils/format';

import { AREA_OPTIONS, PET_TYPE_OPTIONS } from '@/constants/storeOptions';

// 以後 Avatar（頭像）代處理、社群連結（IG / FB）代處理、我的收藏（推薦）代處理
const MemberCenter = () => {
  const dispatch = useDispatch();
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
  const isDirty =
    JSON.stringify(formData) !==
    JSON.stringify({
      userName: user?.userName || '',
      bio: user?.bio || '',
      location: user?.location || '',
      favoritePetTypes: user?.favoritePetTypes || [],
    });

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
      const updatedUser = await updateUserApi(user.id, formData);

      setAuthUser(updatedUser);
      dispatch(setUser(updatedUser));

      success('會員資料更新成功');
      setIsEditing(false);
    } catch (err) {
      const errorMessage = extractErrorMessage(
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

  useEffect(() => {
    if (!user) return;

    // 這裡是「變動自動同步 setState」，所以要避免相同資料+淺拷貝造成無窮reference
    // 避免原本 setFormData(...)，導致useEffect → setState → render → dependency 變 → useEffect → ...
    setFormData((prev) => {
      const newData = {
        userName: user.userName || '',
        bio: user.bio || '',
        location: user.location || '',
        favoritePetTypes: user.favoritePetTypes || [],
      };

      return JSON.stringify(prev) === JSON.stringify(newData) ? prev : newData;
    });
  }, [user]);

  return (
    <>
      <SubHero variant="memberCenter" />
      <section className="container ui-container mt-5">
        <div className="row member-group">
          {/* 左側：會員資訊 */}
          <aside className="col-lg-4">
            <div className="member-card p-3 shadow-sm">
              <h2 className="mb-3 text-center">會員資訊</h2>
              <div className="member-card-info mb-3">
                <p className="info-title">Email：</p>
                <p className="text-start">{user.email}</p>
                <p className="info-title">角色：</p>
                <p className="text-start">{user.role}</p>
                <p className="info-title">註冊時間：</p>
                <p className="text-start">{formatDate(user.createdAt)}</p>
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

          <main className="col-lg-8">
            <div className="member-form shadow-sm p-3">
              <h2 className="mb-4 text-lg-start text-center">編輯個人資料</h2>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="userName" className="form-label info-title">
                    使用者名稱：
                  </label>
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
                  <label htmlFor="bio" className="form-label info-title">
                    個人簡介：
                  </label>
                  <textarea
                    className="form-control"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="location" className="form-label info-title">
                    所在地：
                  </label>

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
                  <label
                    htmlFor="favoritePetTypes"
                    className="form-label info-title"
                  >
                    喜好寵物：
                  </label>
                  <div className="d-flex flex-wrap gap-2 mt-2 ">
                    {PET_TYPE_OPTIONS.map((type, index) => {
                      const isChecked =
                        formData.favoritePetTypes.includes(type);
                      return (
                        <label
                          key={`${type}-${index}`}
                          className={`petType-checkbox 
    ${isChecked ? 'checked' : ''} 
    ${!isEditing ? 'disabled' : ''}
  `}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handlePetTypeChange(type)}
                            disabled={!isEditing}
                          />
                          <span>{type}</span>
                        </label>
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
