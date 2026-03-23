import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// features
import { setToken, logout } from '@/features/authSlice';
import { setUser, clearUser } from '@/features/userSlice';
// hook
import { useToast } from '@/hook/useToast';
// utils
import { getAuth } from '@/utils/auth';
import { extractErrorMessage } from '@/utils/errorHandler';

export const useAuthInit = () => {
  const { showError } = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const initAuth = async () => {
      // 不從 cookie 取出token，改從 localStorage 取得 token、user
      const { token, user } = getAuth();
      // 沒有 token 直接 logout() 並導向登入
      if (!token || !user) {
        dispatch(logout());
        dispatch(clearUser());
        if (window.location.pathname !== '/login') {
          showError('請先登入，將導向登入頁面。!token');
          navigate('/login');
        }
        return;
      }

      try {
        const userData = JSON.parse(user); // 從字串轉回物件
        dispatch(setToken({ token }));
        dispatch(setUser(userData));
      } catch (error) {
        dispatch(logout());
        dispatch(clearUser());
        const errorMessage = extractErrorMessage(
          error,
          null,
          '請先登入，將導向登入頁面。!try'
        );
        showError(errorMessage);
        navigate('/login');
      }
    };

    initAuth();
  }, [dispatch, navigate, showError]);
};
