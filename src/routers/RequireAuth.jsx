import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAuth } from '@/utils/auth';

const RequireAuth = ({ role }) => {
  const reduxUser = useSelector((state) => state.user.user);
  const { token, user: localUser } = getAuth();
  const location = useLocation();
  const user = reduxUser || localUser;

  // 之後補一個 store - loading 狀態（避免閃跳）
  // if (reduxUser === undefined) {
  //   return <FullPageLoader />;
  // }

  // 未登入 → 導去 login + 記錄來源
  if (!token || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 角色權限檢查
  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default RequireAuth;
