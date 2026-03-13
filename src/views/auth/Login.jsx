import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import FullPageLoader from '@/components/shared/FullPageLoader';

import { handleApiError } from '@/utils/apiErrorHandler';

import { useDispatch } from 'react-redux';
import { useToast } from '@/hooks/useToast';

// Service
import { loginApi } from '@/services/authService';
// Slice
import { setToken } from '@/features/authSlice';
import { setUser } from '@/features/userSlice';

const LoginPage = () => {
  // 初始化 dispatch
  const dispatch = useDispatch();
  // // 初始化 navigate
  const navigate = useNavigate();
  const { success, showError, warning } = useToast();

  const [account, setAccount] = useState({
    username: 'example@test.com',
    password: 'example',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [isScreenLoading, setIsScreenLoading] = useState(false);

  // // 登入表單 - 登入submit事件（使用 async/await）
  const handleLogin = async (e) => {
    e.preventDefault(); // 一定要最前面，避免後續程式碼執行後頁面刷新
    setIsScreenLoading(true);
    setErrorMessage(''); // 清空錯誤資訊區

    if (!account.username || !account.password) {
      setErrorMessage('請填寫完整登入資訊');
      warning('請填寫完整登入資訊');
      setIsScreenLoading(false);
      return;
    }

    try {
      const res = await loginApi(account);
      const { accessToken, expired, user } = res;

      const token = accessToken;
      document.cookie = `RarePetFinder=${token}; path=/; expires=${new Date(
        expired
      ).toUTCString()}`;

      localStorage.setItem('token', token);

      dispatch(setToken({ token }));
      dispatch(setUser(user));

      console.log('登入成功', { token, user }); // testconsole

      success('登入成功，將導向後台首頁');

      setTimeout(() => {
        //由於現在沒有後台，先假裝home真的跳躍了
        navigate('/');
      }, 500);
    } catch (err) {
      const errorMessage = handleApiError(
        err,
        setErrorMessage,
        '登出失敗，請重新嘗試。'
      );
      showError(errorMessage);
    } finally {
      setIsScreenLoading(false);
    }
  };

  // 登入表單 - Input變動
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAccount((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center vh-100">
        <h1 className="mb-5">請先登入</h1>
        {errorMessage && (
          <div className="alert alert-danger w-100">{errorMessage}</div>
        )}
        <form onSubmit={handleLogin} className="d-flex flex-column gap-3">
          <div className="form-floating mb-3">
            <input
              id="username"
              name="username"
              type="email"
              value={account.username}
              onChange={handleInputChange}
              className="form-control"
              placeholder="example@test.com"
              required
            />
            <label htmlFor="username">Email address</label>
          </div>
          <div className="form-floating">
            <input
              id="password"
              name="password"
              type="password"
              value={account.password || ''}
              onChange={handleInputChange}
              className="form-control"
              placeholder="example"
              required
            />
            <label htmlFor="password">Password</label>
          </div>
          <button type="submit" className="btn btn-primary">
            登入
          </button>
        </form>
      </div>
      {/* ScreenLoading */}
      <FullPageLoader show={isScreenLoading} zIndex={2000} />
    </>
  );
};

export default LoginPage;
