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
export const changeSource = createAsyncThunk(
  'dashboard/changeSource',
  async (raw) => {
    console.log(raw);
    const res = await axios.post(API, {
      metrage_id: metrage_id || null,
      method:
        raw?.source === 'user'
          ? 'crm.dashboard.setUser'
          : 'crm.dashboard.setOffice',
      fields: {
        UID: raw?.select?.UID,
      },
    });
    if (res?.statusText === 'OK') {
      return res?.data?.result || {};
    }
    return {};
  }
);
export const setNewRange = createAsyncThunk(
  'dashboard/setNewRange',
  async (raw) => {
    const res = await axios.post(API, {
      metrage_id: metrage_id || null,
      method: 'crm.dashboard.setRange',
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
  name: 'dashboard',
  initialState,
  reducers: {
    clearDashboard(state) {
      state.data = {};
      state.loading = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getChartList.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(changeSource.pending, (state) => {
        state.loading = true;
      })
      .addCase(changeSource.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(setNewRange.fulfilled, (state, action) => {
        state.data[action.payload.APIName] = action.payload;
      });
  },
});

export const { clearDashboard } = dashboardSlice.actions;
export default dashboardSlice.reducer;
