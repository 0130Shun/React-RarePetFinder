import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  fullPage: false, // 全畫面 loading → 給 FullPageLoader 用
  // buttons: {}, // 按鈕類型的 loading（可同時有多個按鈕在 loading）
  // 以後有明顯差異的再加，例如：
  // modals: {},             // modal 內的 loading
  // submits: {}             // 表單提交 loading
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    // 全畫面 loading
    // 在需要顯示全畫面 loading 的地方（例如 API 呼叫前）
    // dispatch(setPageLoader(true));
    setPageLoader: (state, action) => {
      state.fullPage = action.payload; // payload: true 或 false
    },

    // // 單一或多個按鈕 loading（推薦這樣寫）
    // setButtonLoader: (state, action) => {
    //   const { key, isLoading } = action.payload; // key 例如 'submitLogin', 'saveStore'
    //   state.buttons[key] = isLoading;
    // },

    // // 可選：清除所有 button loading（例如登出時用）
    // clearAllButtonLoaders: (state) => {
    //   state.buttons = {};
    // },
  },
});

// 用 actions 將設定好的方法匯出
export const { setPageLoader } = loadingSlice.actions;
export default loadingSlice.reducer;
