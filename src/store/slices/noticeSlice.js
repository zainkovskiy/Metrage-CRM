import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notices: [],
};
const noticeSlice = createSlice({
  name: 'notice',
  initialState,
  reducers: {
    addNewNotice(state, action) {
      state.notices = [...state.notices, action.payload];
    },
    removeNotice(state, action) {
      const curNotice = action.payload;
      state.notices = state.notices.filter((item) => item.UID !== curNotice);
    },
  },
});

export const { addNewNotice, removeNotice } = noticeSlice.actions;
export default noticeSlice.reducer;
