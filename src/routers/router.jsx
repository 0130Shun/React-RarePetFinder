import { createHashRouter } from 'react-router-dom';
import FrontendLayout from '@/layout/FrontendLayout';
import AdminLayout from '@/layout/AdminLayout';

//前台頁面
import Home from '@/views/front/home/Home';
import Articles from '@/views/front/Articles';
import FindStores from '@/views/front/FindStores';
import StoreDetail from '@/views/front/StoreDetail';

// auth
import Login from '@/views/auth/Login';
import Dashboard from '@/views/auth/Dashboard';
import AdminNotFound from '@/views/auth/AdminNotFound';
// misc
import NotFound from '@/views/front/NotFound';
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
            path: '*',
            element: <AdminNotFound />,
          },
        ],
      },
    ],
  },
]);
