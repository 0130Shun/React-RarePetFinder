import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAuth } from '@/utils/auth';

const RequireAuth = ({ role }) => {
  const reduxUser = useSelector((state) => state.user.user);
  const { token, user: localUser } = getAuth();
  const location = useLocation();
  const user = reduxUser || localUser;

  // // 未登入
  // if (!token || !user) {
  //   return <Navigate to="/login" replace />;
  // }
  // // 防止 user 不是 object
  // if (typeof user !== 'object') {
  //   return <Navigate to="/login" replace />;
  // }
  // // 權限不足
  // if (role && user.role !== role) {
  //   return <Navigate to="/" replace />;
  // }

  // 檢查 Token 是否存在
  if (!token) {
    // 將當前企圖前往的頁面記錄在 state 中，登入後可跳回
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 檢查使用者資訊是否完整
  if (!user || typeof user !== 'object') {
    return <Navigate to="/login" replace />;
  }

  // 角色權限檢查
  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default RequireAuth;
