import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// 載入 bootstrap 的 css 與 js
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
//import "./scss/main.scss";
import './styles/main.scss'; // 入口 Sass
import App from './App';

import { Provider } from 'react-redux';
import { store } from '@/store/store';
import Toast from '@/components/shared/ToastList.jsx';

createRoot(document.getElementById('root')).render(
  // 嚴謹模式<StrictMode>
  // <App />
  // </StrictMode>,
  <Provider store={store}>
    <Toast /> {/* 確保 Toast 能全局監聽 Redux 狀態 */}
    <App />
  </Provider>
);
