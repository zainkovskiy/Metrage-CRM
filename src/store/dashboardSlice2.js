import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const API = process.env.MAIN_API;

export const getDataDashboard = createAsyncThunk(
  'dashboard2/getDataDashboard',
  async () => {
    const res = await axios.post(API, {
      metrage_id: metrage_id || null,
      method: 'crm.dashboard2.get',
    });
    if (res?.statusText === 'OK') {
      return res?.data?.result || {};
    }
    return {};
  }
);
export const setModeDashboard = createAsyncThunk(
  'dashboard2/setModeDashboard',
  async (raw) => {
    const res = await axios.post(API, {
      metrage_id: metrage_id || null,
      method: 'crm.dashboard2.setModeForm',
      fields: raw,
    });
    if (res?.statusText === 'OK') {
      return res?.data?.result || {};
    }
    return {};
  }
);
export const setPeriodDashboard = createAsyncThunk(
  'dashboard2/setPeriodDashboard',
  async (raw) => {
    const res = await axios.post(API, {
      metrage_id: metrage_id || null,
      method: 'crm.dashboard2.setPeriod',
      fields: raw,
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
  name: 'dashboard2',
  initialState,
  reducers: {
    clearDashboard(state) {
      state.data = {};
      state.loading = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getDataDashboard.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(setModeDashboard.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(setPeriodDashboard.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export const { clearDashboard } = dashboardSlice.actions;
export default dashboardSlice.reducer;
