import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const API = process.env.MAIN_API;

export const getDDSData = createAsyncThunk(
  'dds/getDDSData',
  async (filterForm, { getState, dispatch }) => {
    const curFilter = filterForm ? filterForm : getState().dds.filter;
    const res = await axios.post(API, {
      metrage_id: metrage_id || null,
      method: 'crm.dds.filter2',
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
export const getBillData = createAsyncThunk(
  'dds/getBillData',
  async (_, { dispatch }) => {
    const res = await axios.post(API, {
      metrage_id: metrage_id || null,
      method: 'crm.dds.getBankRemains',
    });
    if (res?.statusText === 'OK') {
      const data = res?.data?.result || null;
      if (data?.length > 0) {
        dispatch(getChartsForBank(data[0].UID));
      }
      return data;
    }
    return null;
  }
);
export const getChartsForBank = createAsyncThunk(
  'dds/getChartsForBank',
  async (UID) => {
    const res = await axios.post(API, {
      metrage_id: metrage_id || null,
      method: 'crm.dds.getChartsForBank',
      fields: {
        bankId: UID,
      },
    });
    if (res?.statusText === 'OK') {
      return res?.data?.result || null;
    }
    return null;
  }
);
export const actionDds = createAsyncThunk(
  'dds/actionDds',
  async (dds, { dispatch }) => {
    const res = await axios.post(API, {
      metrage_id: metrage_id || null,
      method: 'crm.dds.set',
      fields: dds,
    });

    if (res?.statusText === 'OK') {
      dispatch(getDDSData());
    }
  }
);

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
  mode: 'dds',
  ddsData: null,
  billData: null,
  bankCharts: null,
  loadingList: true,
  filter: getFilter(),
  reportFilter: {
    period: 'thisMonth',
    from: '',
    to: '',
  },
};

const ddsSlice = createSlice({
  name: 'dds',
  initialState,
  reducers: {
    resetDDSFilter(state) {
      state.filter = defaultDDSFilter;
    },
    setNewFilter(state, action) {
      state.filter = action.payload;
    },
    setNewMode(state, action) {
      state.mode = action.payload;
      state.loadingList = true;
    },
    setReportFilter(state, action) {
      const key = action.payload.key;
      const value = action.payload.value;
      state.reportFilter[key] = value;
    },
    clearDDS(state) {
      state.ddsData = null;
      state.billData = null;
      state.bankCharts = null;
      state.loadingList = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getDDSData.fulfilled, (state, action) => {
      state.ddsData = action.payload;
      state.loadingList = false;
    });
    builder.addCase(getBillData.fulfilled, (state, action) => {
      state.billData = action.payload;
      state.loadingList = false;
    });
    builder.addCase(getChartsForBank.fulfilled, (state, action) => {
      state.bankCharts = action.payload;
    });
  },
});

export const {
  setNewFilter,
  resetDDSFilter,
  clearDDS,
  setNewMode,
  setReportFilter,
} = ddsSlice.actions;
export default ddsSlice.reducer;
