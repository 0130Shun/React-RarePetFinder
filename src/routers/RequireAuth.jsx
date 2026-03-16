import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAuth } from '@/utils/auth';

const RequireAuth = ({ role }) => {
  const reduxUser = useSelector((state) => state.user.user);

  const { token, user: localUser } = getAuth();

  const user = reduxUser || localUser;

  // 未登入
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // 防止 user 不是 object
  if (typeof user !== 'object') {
    return <Navigate to="/login" replace />;
  }

  // 權限不足
  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default RequireAuth;
