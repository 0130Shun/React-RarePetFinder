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
import Login from '@/views/front/Login';
import MemberCenter from '@/views/front/MemberCenter';
import Favorite from '@/views/front/Favorite';

// auth - 後台頁面
import Dashboard from '@/views/auth/Dashboard';
import Members from '@/views/auth/Members';
import Stores from '@/views/auth/Members';
// import StArticlesores from '@/views/auth/Articles';
// import Announcements from '@/views/auth/Announcements';
import AdminNotFound from '@/views/auth/AdminNotFound';

// Auth登入邏輯 抽到router-RequireAuth去判斷
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
            path: 'members',
            element: <Members />,
          },
          {
            path: 'stores',
            element: <Stores />,
          },
          // {
          //   path: 'articles',
          //   element: <Articles />,
          // },
          // {
          //   path: 'announcements',
          //   element: <Announcements />,
          // },
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
