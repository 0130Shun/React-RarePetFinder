import { configureStore } from '@reduxjs/toolkit';

import authReducer from '@/features/authSlice';
// 由於沒有回傳會員名稱和權限狀態的API，userSlice先製作後暫時不使用
import userReducer from '@/features/user/userSlice';
// import toastReducer from '@/features/toast/toastSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    // toast: toastReducer,
  },
});
