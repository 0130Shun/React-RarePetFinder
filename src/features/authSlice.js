import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   isAuth: false,
//   token: null,
// };
// 解決 Redux 初始狀態「空值」問題，避免第一次渲染時可能因為 Redux 還沒同步而踢出去
const initialState = {
  isAuth: !!localStorage.getItem('accessToken'),
  token: localStorage.getItem('accessToken') || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.isAuth = true;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.isAuth = false;
      state.token = null;
    },
  },
});

export const { setToken, logout } = authSlice.actions;
export default authSlice.reducer;
