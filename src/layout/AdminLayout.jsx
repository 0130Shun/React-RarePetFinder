//主控layout 放header、footer、main

import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import Header from '../components/Header'; // 可選
import Footer from '../components/Footer';
import GoTop from '@/components/shared/GoTop';
import { useNavigate } from 'react-router-dom';
import { useAuthInit } from '@/hook/useAuthInit';

import { useSelector } from 'react-redux';
import { useToast } from '@/hook/useToast';

import { clearAuth } from '@/utils/auth';
import { logout } from '@/features/authSlice';
import { clearUser } from '@/features/userSlice';
import { useDispatch } from 'react-redux';

const AdminLayout = () => {
  useAuthInit();
  // 初始化 dispatch navigate
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { warning } = useToast();
  // TODO: 除了寫法1、2，還有優化寫法 Redux user 結構，避免 state.user.user
  const { user } = useSelector((state) => state.user); // 寫法1
  // const user = useSelector((state) => state.user.user); // 寫法2

  useEffect(() => {
    // 第一次 render 時，user = undefined
    if (user === undefined) return; // 等 Redux 初始化

    // 非 admin權限或沒有 user 就跳轉首頁，並清除 localStorage、Redux
    if (!user || user.role !== 'admin') {
      clearAuth();
      dispatch(logout());
      dispatch(clearUser());
      warning('帳號權限不足或密碼錯誤請重新登入');
      navigate('/login');
    }
  }, [user, dispatch, warning, navigate]);

  return (
    <>
      <Header />
      <main className="container ui-layout">
        <Outlet />
      </main>
      <GoTop />
      <Footer />
    </>
  );
};

export default AdminLayout;
