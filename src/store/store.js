import { configureStore } from '@reduxjs/toolkit';

import authReducer from '@/features/authSlice';
import userReducer from '@/features/userSlice';
import toastReducer from '@/features/toastSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    toast: toastReducer,
  },
});
