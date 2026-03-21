import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

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

const MemberCenter = () => {
  const dispatch = useDispatch();
  const { success, showError, warning } = useToast();
  const [isScreenLoading, setIsScreenLoading] = useState(false);
  // const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const user = useSelector((state) => state.user.user);
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

  // 日期調整
  // const formatDate = (isoString) => {
  //   return new Date(isoString).toLocaleString('zh-TW', {
  //     timeZone: 'Asia/Taipei',
  //   });
  // };
  const formatDate = (isoString) => {
    const date = new Date(isoString);

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
  };
  const handleToggleEdit = () => {
    if (isEditing) {
      handleCancel();
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  if (!user) return <div>請重新登入</div>;

  return (
    <>
      <SubHero variant="memberCenter" />
      <section className="container ui-container mt-5">
        <div className="row g-4">
          {/* 左側：會員資訊 */}
          <aside className="col-lg-4">
            <div className="member-card p-4 shadow-sm">
              <h5 className="mb-3">會員資訊</h5>

              <p>Email：{user.email}</p>
              <p>角色：{user.role}</p>
              <p>註冊時間：{formatDate(user.createdAt)}</p>

              {/* <button
                className="btn ui-btn ui-btn-warning w-100 mt-3"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? '關閉編輯' : '編輯資料'}
              </button> */}
              {/* {isEditing ? (
                <button
                  className="btn ui-btn ui-btn-warning w-100 mt-3"
                  onClick={() => {
                    setIsEditing(!isEditing);
                    handleCancel();
                  }}
                >
                  取消編輯
                </button>
              ) : (
                <button
                  className="btn ui-btn ui-btn-warning w-100 mt-3"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  編輯資料
                </button>
              )} */}
              <button
                className="btn ui-btn ui-btn-warning w-100 mt-3"
                onClick={() => {
                  if (isEditing) {
                    handleToggleEdit(); // 取消才 reset
                  } else {
                    setIsEditing(true);
                  }
                }}
              >
                {isEditing ? '取消編輯' : '編輯資料'}
              </button>
            </div>
          </aside>

          {/* 右側：表單 */}
          <main className="col-lg-8">
            <div className="member-form p-4 shadow-sm">
              <h5 className="mb-4">編輯個人資料</h5>

              <form onSubmit={handleSubmit}>
                {/* userName */}
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

                {/* bio */}
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

                {/* location（重點） */}
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

                {/* favoritePetTypes */}
                <div className="mb-4">
                  <label className="form-label">喜好寵物</label>

                  <div className="d-flex flex-wrap gap-2 mt-2">
                    {PET_OPTIONS.map((type) => {
                      const isChecked =
                        formData.favoritePetTypes.includes(type);

                      return (
                        <div
                          key={type}
                          className={`pet-type-checkbox ${isChecked ? 'checked' : ''}`}
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
                  <button
                    type="submit"
                    className="btn ui-btn ui-btn-primary w-100"
                  >
                    儲存變更
                  </button>
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
