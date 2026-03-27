import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Eye, EyeOff } from 'react-feather';

// Service
import { loginApi, registerApi } from '@/services/authService';
// Slice
import { setToken, logout } from '@/features/authSlice';
import { setUser, clearUser } from '@/features/userSlice';
// hook
import { useToast } from '@/hook/useToast';
// components
import SubHero from '@/components/subHero/SubHero';
import FullPageLoader from '@/components/shared/FullPageLoader';
// import LoginForm from '@/components/LoginPage/LoginForm';
// import RegisterForm from '@/components/LoginPage/RegisterForm';
// auth
import { setAuthToken, setAuthUser, clearAuth } from '@/utils/auth';
import { extractErrorMessage } from '@/utils/errorHandler';

const LoginPage = () => {
  // 初始化 dispatch、navigate、location
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { success, showError, warning } = useToast();
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const from = location.state?.from?.pathname || '/membercenter'; // navigate 調整路徑，先預設導向membercenter

  // 登入區域
  const [account, setAccount] = useState({
    email: 'example@test.com',
    password: 'example',
  });

  // 註冊 state
  const [registerData, setRegisterData] = useState({
    userName: '',
    email: '',
    password: '',
  });
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);

  const [loginError, setLoginError] = useState('');
  const [registerError, setRegisterError] = useState('');
  const [isScreenLoading, setIsScreenLoading] = useState(false);

  // 登入表單 - Input變動
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAccount((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 註冊表單 -  Input變動
  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 登入表單 - 登入submit事件（使用 async/await）
  const handleLogin = async (e) => {
    e.preventDefault(); // 一定要最前面，避免後續程式碼執行後頁面刷新

    let redirectPath = '/membercenter'; // 預設路徑 membercenter
    setIsScreenLoading(true);
    setLoginError(''); // 清空錯誤資訊區

    if (!account.email || !account.password) {
      setLoginError('請填寫完整登入資訊');
      warning('請填寫完整登入資訊');
      setIsScreenLoading(false);
      return;
    }

    try {
      // json-server-auth 不會回 expired(Token 的過期時間（timestamp）)，且已經有 localStorage token cookie 在 SPA 通常不需要。
      const res = await loginApi(account);
      const { accessToken, user } = res;

      // 同時存入 localStorage 和 更新 Redux
      setAuthToken(accessToken);
      setAuthUser(user);
      dispatch(setToken({ token: accessToken }));
      dispatch(setUser(user));

      // 有來源且不是 login 就用其來源， admin 強制走後台
      if (from && from !== '/login') {
        redirectPath = from;
      }
      if (user.role === 'admin') {
        // redirectPath = '/admin';
        // 先關閉登入後，後台介面先轉去前台 membercenter
        redirectPath = '/membercenter';
      }

      // 整合+分流 提示訊息
      if (user.role === 'admin') {
        // 先關閉登入後，後台介面先轉去前台membercenter
        // success(`「 ${user.role} - ${user.userName}」登入成功，將導向後台首頁`);
        success(`「 ${user.role} - ${user.userName}」登入成功，將導向會員中心`);
      } else if (redirectPath === '/membercenter') {
        success(`「 ${user.userName} 」登入成功，將導向會員中心`);
      } else {
        success(`「 ${user.userName} 」登入成功，將導回原頁`);
      }

      // 最後統一導頁
      setTimeout(() => {
        navigate(redirectPath, { replace: true, state: null });
      }, 500);
    } catch (err) {
      // 登入驗證失敗就清除 localStorage、Redux
      clearAuth();
      dispatch(logout());
      dispatch(clearUser());
      const errorMessage = extractErrorMessage(
        err,
        setLoginError,
        '登入驗證失敗，請重新嘗試。'
      );
      showError(errorMessage);
    } finally {
      setIsScreenLoading(false);
    }
  };

  // 切換 註冊表單
  const onSwitchToRegister = () => {
    setMode('register');
    setLoginError('');
  };

  // 註冊 submit
  const handleRegister = async (e) => {
    e.preventDefault();
    setIsScreenLoading(true);
    setRegisterError('');

    const { userName, email, password } = registerData;

    if (!userName || !email || !password) {
      warning('請填寫完整註冊資訊');
      setIsScreenLoading(false);
      return;
    }

    try {
      const now = new Date();
      const registerApiData = { ...registerData, role: 'user', createdAt: now }; // 前台註冊的一律都是 role: 'user'
      await registerApi(registerApiData);

      setRegisterData({
        userName: '',
        email: '',
        password: '',
      });

      // 切換模式讓剛註冊完畢的使用者登入 // 可選： window.location.hash = '#logindiv';
      setTimeout(() => {
        success('註冊成功，請使用剛剛的帳號登入');
        setMode('login');
      }, 500);
    } catch (err) {
      const errorMsg = extractErrorMessage(
        err,
        setRegisterError,
        '註冊失敗，請稍後再試'
      );
      showError(errorMsg);
    } finally {
      setIsScreenLoading(false);
    }
  };

  // 切換 登入表單
  const onSwitchToLogin = () => {
    setMode('login');
    setRegisterError('');
  };

  useEffect(() => {
    if (location.hash === '#register') {
      setMode('register');
    } else {
      setMode('login');
    }
  }, [location.hash]);

  return (
    <>
      <SubHero variant="loginRegister" />
      <section className="container ui-container my-5">
        {mode === 'login' && (
          <div
            id="logindiv"
            className="ui-login d-flex flex-column justify-content-center align-items-center vh-50"
          >
            <h2 className="mb-4">會員登入</h2>
            {loginError && (
              <div className="ui-error-message alert alert-danger text-center mb-4">
                {loginError}
              </div>
            )}
            <form
              onSubmit={handleLogin}
              className={`d-flex flex-column gap-3 ${isScreenLoading ? 'opacity-50' : ''}`}
            >
              <div className="form-floating mb-3">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={account.email}
                  onChange={handleInputChange}
                  className="form-control"
                  placeholder="example@test.com"
                  required
                />
                <label htmlFor="email">Email address</label>
              </div>
              <div className="form-floating ui-input-password ui-input-password--login">
                <input
                  id="password"
                  name="password"
                  type={showLoginPassword ? 'text' : 'password'}
                  value={account.password || ''}
                  onChange={handleInputChange}
                  className="form-control"
                  placeholder="example"
                  required
                />
                <label htmlFor="password">Password</label>
                <button
                  type="button"
                  className="ui-input-password__toggle"
                  onClick={() => setShowLoginPassword(!showLoginPassword)}
                >
                  {showLoginPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>

              <button
                type="submit"
                className="btn ui-btn-primary"
                disabled={isScreenLoading}
              >
                {isScreenLoading ? '登入中...' : '登入'}
              </button>
            </form>
            <p className="mt-3 text-center">
              還沒有帳號？
              <button
                type="button"
                className="btn ui-btn-warning"
                onClick={() => {
                  setMode('register');
                  setLoginError('');
                }}
              >
                註冊
              </button>
            </p>
          </div>
        )}

        {mode === 'register' && (
          <div
            id="register"
            className="ui-login d-flex flex-column justify-content-center align-items-center vh-50"
          >
            <h2 className="mb-4">註冊帳號</h2>
            {registerError && (
              <div className="ui-error-message alert alert-danger text-center mb-4">
                {registerError}
              </div>
            )}
            <form
              onSubmit={handleRegister}
              className={`d-flex flex-column gap-3 ${isScreenLoading ? 'opacity-50' : ''}`}
            >
              {/* userName */}
              <div className="form-floating">
                <input
                  type="text"
                  name="userName"
                  value={registerData.userName}
                  onChange={handleRegisterChange}
                  className="form-control"
                  placeholder="Your Name"
                  required
                />
                <label>使用者名稱</label>
              </div>

              {/* email */}
              <div className="form-floating">
                <input
                  type="email"
                  name="email"
                  value={registerData.email}
                  onChange={handleRegisterChange}
                  className="form-control"
                  placeholder="example@mail.com"
                  required
                />
                <label>Email</label>
              </div>

              {/* password */}
              <div className="form-floating ui-input-password ui-input-password--register">
                <input
                  type={showRegisterPassword ? 'text' : 'password'}
                  name="password"
                  value={registerData.password}
                  onChange={handleRegisterChange}
                  className="form-control"
                  placeholder="password"
                  required
                />
                <label>Password</label>
                <button
                  type="button"
                  className="ui-input-password__toggle"
                  onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                >
                  {showRegisterPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>

              <button
                type="submit"
                className="btn ui-btn-warning"
                disabled={isScreenLoading}
              >
                {isScreenLoading ? '註冊中...' : '註冊'}
              </button>
            </form>
            <p className="mt-3 text-center">
              已經有帳號？
              <button
                type="button"
                className="btn ui-btn-primary"
                onClick={() => onSwitchToLogin()}
              >
                登入
              </button>
            </p>
          </div>
        )}
      </section>

      {/* ScreenLoading */}
      <FullPageLoader show={isScreenLoading} zIndex={2000} />
    </>
  );
};

export default LoginPage;
