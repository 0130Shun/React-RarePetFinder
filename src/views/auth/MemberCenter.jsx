import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// services
import { updateUserApi } from '@/services/authService';
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

  const user = useSelector((state) => state.user.user);
  const [formData, setFormData] = useState({
    userName: user?.userName || '',
    bio: user?.bio || '',
    location: user?.location || '',
    favoritePetTypes: user?.favoritePetTypes || [],
  });

  // 🟡 一般 input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 🟢 checkbox 多選
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

  // 🟣 submit
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
      setIsScreenLoading(false);
    } catch (err) {
      const errorMessage = handleApiError(
        err,
        null,
        '會員資料更新失敗，請重新嘗試。'
      );
      showError(errorMessage);
    } finally {
      setIsScreenLoading(false);
    }
  };

  if (!user) return <div>請重新登入</div>;

  return (
    <>
      <SubHero variant="loginRegister" />
      <div className="container">
        <h2>會員中心</h2>

        {/* 基本資訊 */}
        <div>
          <p>Email：{user.email}</p>
          <p>角色：{user.role}</p>
          <p>註冊時間：{user.createdAt}</p>
        </div>

        <hr />

        <form onSubmit={handleSubmit}>
          {/* userName */}
          <div>
            <label>使用者名稱</label>
            <input
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
            />
          </div>

          {/* bio */}
          <div>
            <label>個人簡介</label>
            <textarea name="bio" value={formData.bio} onChange={handleChange} />
          </div>

          {/* location */}
          <div>
            <label>所在地</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
          </div>

          {/* 🐾 favoritePetTypes */}
          <div>
            <label>喜好寵物類型</label>
            <div>
              {PET_OPTIONS.map((type) => (
                <label key={type} style={{ marginRight: '10px' }}>
                  <input
                    type="checkbox"
                    checked={formData.favoritePetTypes.includes(type)}
                    onChange={() => handlePetTypeChange(type)}
                  />
                  {type}
                </label>
              ))}
            </div>
          </div>

          <button type="submit">更新資料</button>
        </form>
      </div>
      {/* ScreenLoading */}
      <FullPageLoader show={isScreenLoading} zIndex={2000} />
    </>
  );
};

export default MemberCenter;
