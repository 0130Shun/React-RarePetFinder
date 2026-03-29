import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

// Service
import { registerApi, loginApi, getCurrentUser } from '@/services/authService';
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

  const { success, showError } = useToast();
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const from = location.state?.from?.pathname || '/membercenter'; // navigate 調整路徑，先預設導向membercenter

  // 登入區域 - RHF 接管資料流
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: 'example@mail.com',
      password: 'examplePassword',
    },
  });

  // 註冊區域 - RHF 接管資料流
  const {
    register: registerRegister, // 避免跟 login register 撞名,
    handleSubmit: handleRegisterSubmit,
    formState: { errors: registerErrors },
    watch: registerWatch,
  } = useForm({
    defaultValues: {
      userName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);

  const [loginError, setLoginError] = useState('');
  const [registerError, setRegisterError] = useState('');
  const [isScreenLoading, setIsScreenLoading] = useState(false);

  // 登入表單 - 登入submit事件（使用 async/await）
  const handleLogin = async (data) => {
    let redirectPath = '/membercenter'; // 預設路徑 membercenter
    setIsScreenLoading(true);
    setLoginError(''); // 清空錯誤資訊區

    try {
      // 1. 先執行登入 API，取得 accessToken
      const loginRes = await loginApi(data); // 「 RHF 接管資料流」並把 accountData替換成 data
      const { accessToken } = loginRes;
      setAuthToken(accessToken);
      // 透過之前的accessToken，自己去拿 user
      const userRes = await getCurrentUser();
      const user = userRes.data || userRes; // 根據後端回傳格式調整，確保 user 是物件
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
  const handleRegister = async (data) => {
    // e.preventDefault();
    setIsScreenLoading(true);
    setRegisterError('');

    try {
      const now = new Date();
      const { confirmPassword: _confirmPassword, ...rest } = data;
      // role: 'admin';
      // const registerApiData = { ...rest, role: 'admin', createdAt: now, isActive: true, };
      // 前台註冊的一律都是 role: 'user'
      const registerApiData = {
        ...rest,
        role: 'user',
        createdAt: now,
        isActive: true,
      };
      await registerApi(registerApiData);

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
            register={register}
            errors={errors}
            handleLogin={handleSubmit(handleLogin)}
            showLoginPassword={showLoginPassword}
            toggleLoginPassword={toggleLoginPassword}
            loginError={loginError}
            isScreenLoading={isScreenLoading}
            handleSwitchToRegister={handleSwitchToRegister}
          />
        )}

        {mode === 'register' && (
          <RegisterForm
            registerRegister={registerRegister}
            registerErrors={registerErrors}
            registerWatch={registerWatch}
            handleRegister={handleRegisterSubmit(handleRegister)}
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
