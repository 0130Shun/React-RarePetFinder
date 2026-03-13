import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getToken } from '@/utils/auth';
import { handleApiError } from '@/utils/apiErrorHandler';
import { useToast } from '@/hooks/useToast';

import { setToken, logout } from '@/features/authSlice';
import { setUser, clearUser } from '@/features/userSlice';
import { getMe } from '@/services/authService';

export const useAuthInit = () => {
  const { showError } = useToast();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 由於沒有回傳會員名稱和權限狀態的API，userSlice先製作後暫時不使用
  useEffect(() => {
    const initAuth = async () => {
      const token = getToken();

      // 沒有 token 直接 logout() 並導向登入
      if (!token) {
        dispatch(logout());
        return;
      }

      try {
        // 先恢復 token
        dispatch(setToken({ token }));

        // 再取得 user 資訊
        const user = await getMe();

        dispatch(setUser(user));
      } catch (error) {
        dispatch(logout());
        dispatch(clearUser);
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
