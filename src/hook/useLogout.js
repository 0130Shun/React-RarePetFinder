// hooks/useLogout.js
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '@/features/authSlice';
import { clearUser } from '@/features/userSlice';
import { clearAuth } from '@/utils/auth';
import { useToast } from '@/hook/useToast';

export const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { success } = useToast();

  return (username = '使用者') => {
    clearAuth();
    dispatch(logout());
    dispatch(clearUser());

    success(`「${username}」已登出`);
    navigate('/');
  };
};
