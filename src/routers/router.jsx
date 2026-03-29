import { createHashRouter } from 'react-router-dom';
import FrontendLayout from '@/layout/FrontendLayout';
import AdminLayout from '@/layout/AdminLayout';

// 前台頁面
import Home from '@/views/front/home/Home';
import Articles from '@/views/front/Articles';
import FindStores from '@/views/front/FindStores';
// 為避免重構錯誤和方便後續追蹤，將「原版FindStores」保留到新版運作正常後刪除
// import FindStoresBackup from '@/views/front/FindStoresBackup';
import StoreDetail from '@/views/front/StoreDetail';
import NotFound from '@/views/front/NotFound';

// auth - 前台頁面
import Login from '@/views/front/Login';
import MemberCenter from '@/views/front/MemberCenter';
import Favorite from '@/views/front/Favorite';
// 為避免重構錯誤和方便後續追蹤，將「原版FavoriteBackup」保留到新版運作正常後刪除
// import FavoriteBackup from '@/views/front/FavoriteBackup ';

// auth - 後台頁面
import Dashboard from '@/views/auth/Dashboard';
// import AdminNotFound from '@/views/auth/AdminNotFound';
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
      // {
      // 為避免重構錯誤和方便後續追蹤，將「原版FindStores」保留到新版運作正常後刪除
      //   path: 'findstoresbackup',
      //   element: <FindStoresBackup />,
      // },
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
          // {
          //   // 為避免重構錯誤和方便後續追蹤，將「原版FavoriteBackup」保留到新版運作正常後刪除
          //   path: 'favoritebackup',
          //   element: <FavoriteBackup />,
          // },
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
