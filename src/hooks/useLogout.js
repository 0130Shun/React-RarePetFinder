// hooks/useLogout.js
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// features
import { logout } from '@/features/authSlice';
import { clearUser } from '@/features/userSlice';
// hook
import { useToast } from '@/hooks/useToast';
// utils
import { clearAuth } from '@/utils/auth';

export const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { success } = useToast();

  return (username = '使用者') => {
    // 調整順序避免 localStorage 還沒清 → UI 又讀到舊 token
    dispatch(logout());
    dispatch(clearUser());
    clearAuth();
    success(`「${username}」已登出`);
    navigate('/');
  };
};
