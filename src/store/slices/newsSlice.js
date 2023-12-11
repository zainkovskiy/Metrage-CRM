import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const API = process.env.MAIN_API;

export const getNewsList = createAsyncThunk(
  'news/getNewsList',
  async (filterForm, { getState, dispatch }) => {
    // const curFilter = filterForm ? filterForm : getState().deal.filter;
    const res = await axios.post(API, {
      metrage_id: metrage_id || null,
      method: 'crm.news.list',
      // fields: {
      //   ...curFilter,
      //   offset: 0,
      // },
    });
    // if (filterForm) {
    //   dispatch(setNewFilter(filterForm));
    // }
    if (res?.statusText === 'OK') {
      return res?.data?.result || [];
    }
    return [];
  }
);
export const addNewNewsToList = createAsyncThunk(
  'news/addNewNewsToList',
  async (uid) => {
    const res = await axios.post(API, {
      metrage_id: metrage_id || null,
      method: 'crm.news.listOne',
      fields: {
        UID: uid,
      },
    });
    if (res?.statusText === 'OK') {
      return res?.data?.result || {};
    }
    return [];
  }
);

const initialState = {
  news: [],
  loadingList: true,
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    // addNewNews(state, action) {
    //   state.news = [action.payload, ...state.news];
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(getNewsList.fulfilled, (state, action) => {
      state.news = action.payload;
      state.loadingList = false;
    });
    builder.addCase(addNewNewsToList.fulfilled, (state, action) => {
      state.news = [action.payload, ...state.news];
    });
  },
});

export const {} = newsSlice.actions;
export default newsSlice.reducer;
