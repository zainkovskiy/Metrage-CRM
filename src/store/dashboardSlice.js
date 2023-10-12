import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const API = process.env.MAIN_API;

export const getChartList = createAsyncThunk(
  'dashboard/getChartList',
  async () => {
    const res = await axios.post(API, {
      metrage_id: metrage_id || null,
      method: 'crm.dashboard.get',
    });
    if (res?.statusText === 'OK') {
      return res?.data?.result || {};
    }
    return {};
  }
);

const initialState = {
  loading: true,
  data: {},
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    clearDashboard(state) {
      state.data = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getChartList.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
  },
});

export const { clearDashboard } = dashboardSlice.actions;
export default dashboardSlice.reducer;
