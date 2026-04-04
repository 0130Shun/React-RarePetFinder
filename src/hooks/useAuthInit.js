import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

// features
import { setToken } from '@/features/authSlice';
import { setUser } from '@/features/userSlice';
// utils

import { getAuth } from '@/utils/auth';

export const useAuthInit = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const { token, user } = getAuth();
    // if (token && user) {
    //   dispatch(setToken({ token }));
    //   dispatch(setUser(user));
    // } else {
    //   clearAuth();
    //   dispatch(clearUser());
    // }
    // 上一版太過嚴謹了可能會導致來不及儲存就把資料清掉，
    // 所以改成只要 token 存在就設置 token，user 的部分如果存在就設置，不存在就不處理
    if (token) {
      dispatch(setToken({ token }));
      if (user) {
        dispatch(setUser(user));
      }
    }
  }, [dispatch]);
};
