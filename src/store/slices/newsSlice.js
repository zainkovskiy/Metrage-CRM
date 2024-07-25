import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isShowNews: Boolean(globalNews),
  newsList: globalNews ? JSON.parse(globalNews) : null,
};

const newsSlice = createSlice({
  name: 'news',
  windowDevice: null,
  initialState,
  reducers: {
    closeNews(state, action) {
      state.isShowNews = false;
    },
  },
});

export const { closeNews } = newsSlice.actions;
export default newsSlice.reducer;
