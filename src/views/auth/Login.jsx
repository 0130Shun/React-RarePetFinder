import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

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
import LoginForm from '@/components/LoginPage/LoginForm';
import RegisterForm from '@/components/LoginPage/RegisterForm';
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
  const [accountData, setAccountData] = useState({
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
    setAccountData((prev) => ({
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

    if (!accountData.email || !accountData.password) {
      setLoginError('請填寫完整登入資訊');
      warning('請填寫完整登入資訊');
      setIsScreenLoading(false);
      return;
    }

    try {
      // json-server-auth 不會回 expired(Token 的過期時間（timestamp）)，且已經有 localStorage token cookie 在 SPA 通常不需要。
      const res = await loginApi(accountData);
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
        redirectPath = '/admin';
      }

      // 整合+分流 提示訊息
      if (user.role === 'admin') {
        // success(`「 ${user.role} - ${user.userName}」登入成功，將導向會員中心`);
        success(`「 ${user.role}： ${user.userName}」登入成功，將導向後台首頁`);
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

  // 登入表單 切換 註冊表單
  const handleSwitchToRegister = () => {
    setMode('register');
    setLoginError('');
  };

  // toggle Login password
  const toggleLoginPassword = () => {
    setShowLoginPassword((prev) => !prev);
  };

  // 註冊表單 submit
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

  // toggle Register password
  const toggleRegisterPassword = () => {
    setShowRegisterPassword((prev) => !prev);
  };

  // 註冊表單 切換 登入表單
  const handleSwitchToLogin = () => {
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
          <LoginForm
            handleLogin={handleLogin}
            handleInputChange={handleInputChange}
            accountData={accountData}
            showLoginPassword={showLoginPassword}
            toggleLoginPassword={toggleLoginPassword}
            loginError={loginError}
            isScreenLoading={isScreenLoading}
            handleSwitchToRegister={handleSwitchToRegister}
          />
        )}

        {mode === 'register' && (
          <RegisterForm
            handleRegister={handleRegister}
            handleRegisterChange={handleRegisterChange}
            registerData={registerData}
            showRegisterPassword={showRegisterPassword}
            toggleRegisterPassword={toggleRegisterPassword}
            registerError={registerError}
            isScreenLoading={isScreenLoading}
            handleSwitchToLogin={handleSwitchToLogin}
          />
        )}
      </section>

      {/* ScreenLoading */}
      <FullPageLoader show={isScreenLoading} zIndex={2000} />
    </>
  );
};

export default LoginPage;
