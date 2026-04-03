import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// 載入 bootstrap 的 css 與 js
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/main.scss'; // 入口 Sass
import '@/styles/admin.scss'; // 後台入口 Sass
import App from './App';

import { Provider } from 'react-redux';
import { store } from '@/store/store';
import Toast from '@/components/shared/ToastList.jsx';

createRoot(document.getElementById('root')).render(
  // 嚴謹模式<StrictMode>
  // <App />
  // </StrictMode>,
  // Router / Provider / RequireAuth...，「Bootstrap JS 事件沒有正常觸發」
  // 或「React Router 攔截了 <a href="#">」導致 dropdown 沒有被 bootstrap 啟動，
  // 使用時要注意
  <Provider store={store}>
    <Toast /> {/* 確保 Toast 能全局監聽 Redux 狀態 */}
    <App />
  </Provider>
);
