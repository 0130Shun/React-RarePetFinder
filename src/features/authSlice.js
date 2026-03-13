import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuth: false,
  token: null,
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
