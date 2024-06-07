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
export const actionDds = createAsyncThunk('dds/actionDds', async (dds) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.dds.set',
    fields: dds,
  });

  if (res?.statusText === 'OK') {
    return res?.data?.result || null;
  }
  return null;
});

export const defaultDDSFilter = {
  periodFrom: '',
  periodTo: '',
  bank: '',
  legal: '',
  isDeleted: false,
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
    builder.addCase(actionDds.fulfilled, (state, action) => {
      const newDds = action.payload;
      if (!newDds) {
        return;
      }
      const findDds = state.ddsData.records.find(
        (item) => item.UID === newDds.UID
      );
      if (!findDds) {
        state.ddsData.records = [...state.ddsData.records, newDds];
        return;
      }
      if (JSON.stringify(newDds) === JSON.stringify(findDds)) {
        return;
      }
      state.ddsData.records.splice(
        state.ddsData.records.indexOf(findDds),
        1,
        newDds
      );
    });
  },
});

export const { setNewFilter, resetDDSFilter, clearDDS } = ddsSlice.actions;
export default ddsSlice.reducer;
