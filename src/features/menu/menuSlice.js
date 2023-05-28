import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeName: '首页',
};

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setActiveName: (state, { payload }) => {
      state.activeName = payload;
    },
  },
});

export const { setActiveName } = menuSlice.actions;
export default menuSlice.reducer;
