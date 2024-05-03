import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const API = process.env.MAIN_API;

export const getDDSData = createAsyncThunk(
  'dds/getDDSData',
  async (filterForm, { getState, dispatch }) => {
    const curFilter = filterForm ? filterForm : getState().dds.filter;
    const res = await axios.post(API, {
      metrage_id: metrage_id || null,
      method: 'crm.dds.filter',
      fields: {
        ...curFilter,
      },
    });
    if (filterForm) {
      dispatch(setNewFilter(filterForm));
    }
    if (res?.statusText === 'OK') {
      return res?.data?.result || null;
    }
    return null;
  }
);

export const defaultDDSFilter = {
  periodFrom: '',
  periodTo: '',
  bank: '',
  legal: '',
};
const getFilter = () => {
  const filter = localStorage.getItem('filterDDS');
  if (filter) {
    return JSON.parse(filter);
  }
  return defaultDDSFilter;
};
const initialState = {
  ddsData: null,
  loadingList: true,
  filter: getFilter(),
};

const ddsSlice = createSlice({
  name: 'mortage',
  initialState,
  reducers: {
    resetDDSFilter(state) {
      state.filter = defaultDDSFilter;
    },
    setNewFilter(state, action) {
      state.filter = action.payload;
    },
    clearDDS(state) {
      state.ddsData = null;
      state.loadingList = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getDDSData.fulfilled, (state, action) => {
      state.ddsData = action.payload;
      state.loadingList = false;
    });
  },
});

export const { setNewFilter, resetDDSFilter, clearDDS } = ddsSlice.actions;
export default ddsSlice.reducer;
