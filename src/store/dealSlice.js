import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API = process.env.MAIN_API;

export const getDealList = createAsyncThunk('deal/getDealList', async () => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.deal.list',
    fields: {
      offset: 0,
    },
  });
  if (res?.statusText === 'OK') {
    return res?.data?.result || [];
  }
  return [];
});
const initialState = {
  loadingList: true,
  deals: [],
  offset: 0,
};

const dealSlice = createSlice({
  name: 'deal',
  initialState,
  reducers: {
    clearDeals(state, action) {
      state.deals = [];
      state.offset = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      // .addCase(getDealList.pending, (state) => {
      //   state.loadingList = true;
      // })
      .addCase(getDealList.fulfilled, (state, action) => {
        state.loadingList = false;
        state.deals = action.payload;
      })
      .addCase(getDealList.rejected, (state) => {
        state.loadingList = false;
      });
  },
});
export const { clearDeals } = dealSlice.actions;
export default dealSlice.reducer;
