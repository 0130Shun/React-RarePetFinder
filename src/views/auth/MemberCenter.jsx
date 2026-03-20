import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setUser } from '@/features/userSlice';
import { setAuthUser } from '@/utils/auth';
import { useToast } from '@/hook/useToast';

const MemberCenter = () => {
  const dispatch = useDispatch();
  const { success, warning } = useToast();

  const user = useSelector((state) => state.user.user);

  const [formData, setFormData] = useState({
    userName: user?.userName || '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.userName) {
      warning('名稱不可為空');
      return;
    }

    // 👉 mock 更新（json-server-auth 沒有 patch password API）
    const updatedUser = {
      ...user,
      userName: formData.userName,
      ...(formData.password && { password: formData.password }),
    };

    // 更新 localStorage + Redux
    setAuthUser(updatedUser);
    dispatch(setUser(updatedUser));

    success('會員資料更新成功');
  };

  if (!user) return <div>請重新登入</div>;

  return (
    <div className="container">
      <h2>會員中心</h2>

      <div>
        <p>Email：{user.email}</p>
        <p>角色：{user.role}</p>
        <p>註冊時間：{user.createdAt}</p>
      </div>

      <hr />

      <form onSubmit={handleSubmit}>
        <div>
          <label>使用者名稱</label>
          <input
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>新密碼（可不填）</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <button type="submit">更新資料</button>
      </form>
    </div>
  );
};

export default MemberCenter;
