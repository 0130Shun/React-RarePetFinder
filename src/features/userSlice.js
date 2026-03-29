import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   user: null,
// };
// 解決 Redux 初始狀態「空值」問題，避免第一次渲染時可能因為 Redux 還沒同步而踢出去
const initialState = {
  user: localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    clearUser(state) {
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
