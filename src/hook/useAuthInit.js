import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { setToken } from '@/features/authSlice';
import { setUser, clearUser } from '@/features/userSlice';

import { getAuth, clearAuth } from '@/utils/auth';

export const useAuthInit = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const { token, user } = getAuth();

    if (token && user) {
      dispatch(setToken({ token }));
      dispatch(setUser(user));
    } else {
      clearAuth();
      dispatch(clearUser());
    }
  }, [dispatch]);
};
