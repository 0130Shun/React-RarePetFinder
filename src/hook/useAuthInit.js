import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { handleApiError } from '@/utils/apiErrorHandler';
import { useToast } from '@/hook/useToast';

import { setToken, logout } from '@/features/authSlice';
import { setUser, clearUser } from '@/features/userSlice';

import { getAuth } from '@/utils/auth';

export const useAuthInit = () => {
  const { showError } = useToast();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 由於沒有回傳會員名稱和權限狀態的API，userSlice先製作後暫時不使用
  useEffect(() => {
    const initAuth = async () => {
      // 不從 cookie 取出token，改從 localStorage 取得 token、user
      const { token, user } = getAuth();

      // 沒有 token 直接 logout() 並導向登入
      if (!token || !user) {
        dispatch(logout());
        dispatch(clearUser());
        showError('請先登入，將導向登入頁面。');
        navigate('/login');
        return;
      }

      try {
        const userData = JSON.parse(user); // 從字串轉回物件
        dispatch(setToken({ token }));
        dispatch(setUser(userData));
      } catch (error) {
        dispatch(logout());
        dispatch(clearUser());
        const errorMessage = handleApiError(
          error,
          null,
          '請先登入，將導向登入頁面。'
        );
        showError(errorMessage);
        navigate('/login');
      }
    };

    initAuth();
  }, [dispatch, navigate, showError]);
};
