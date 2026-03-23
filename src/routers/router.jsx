import { createHashRouter } from 'react-router-dom';
import FrontendLayout from '@/layout/FrontendLayout';
import AdminLayout from '@/layout/AdminLayout';

// 前台頁面
import Home from '@/views/front/home/Home';
import Articles from '@/views/front/Articles';
import FindStores from '@/views/front/FindStores';
import StoreDetail from '@/views/front/StoreDetail';
import NotFound from '@/views/front/NotFound';
// auth - 前台頁面
import Login from '@/views/auth/Login';
import MemberCenter from '@/views/auth/MemberCenter';
import Favorite from '@/views/auth/Favorite';
// auth - 後台頁面
import Dashboard from '@/views/auth/Dashboard';
import AdminNotFound from '@/views/auth/AdminNotFound';

// 入邏輯抽到router-RequireAuth去判斷
import RequireAuth from './RequireAuth';

export const router = createHashRouter([
  {
    path: '/',
    element: <FrontendLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'findstores',
        element: <FindStores />,
      },
      {
        path: 'storedetail/:storeId',
        element: <StoreDetail />,
      },
      {
        path: 'articles',
        element: <Articles />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        // 登入後前台用戶才可以看到的頁面
        element: <RequireAuth />, // 改成不用 role，代表只要登入即可
        children: [
          {
            path: 'membercenter',
            element: <MemberCenter />,
          },
          {
            path: 'favorite',
            element: <Favorite />,
          },
        ],
      },
      {
        // 前台 404 頁面
        path: '*',
        element: <NotFound />,
      },
    ],
  },
  {
    path: '/admin',
    element: <RequireAuth role="admin" />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
          {
            // 後台 404 頁面
            path: '*',
            element: <AdminNotFound />,
          },
        ],
      },
    ],
  },
]);
