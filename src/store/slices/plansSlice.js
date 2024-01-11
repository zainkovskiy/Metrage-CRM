import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const API = process.env.MAIN_API;

export const getPlansList = createAsyncThunk(
  'plans/getNewsList',
  async (filterForm, { getState, dispatch }) => {
    // const curFilter = filterForm ? filterForm : getState().deal.filter;
    const res = await axios.post(API, {
      metrage_id: metrage_id || null,
      method: 'crm.plans.filter',
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

const initialState = {
  plans: [],
  loadingList: true,
};

const plansSlice = createSlice({
  name: 'plans',
  initialState,
  reducers: {
    // addNewNews(state, action) {
    //   state.news = [action.payload, ...state.news];
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(getPlansList.fulfilled, (state, action) => {
      state.plans = action.payload;
      state.loadingList = false;
    });
  },
});

export const {} = plansSlice.actions;
export default plansSlice.reducer;
