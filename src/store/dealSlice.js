import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API = process.env.MAIN_API;
const user = globalUser ? JSON.parse(globalUser) : null;

export const getDealList = createAsyncThunk(
  'deal/getDealList',
  async (filterForm, { getState, dispatch }) => {
    const curFilter = filterForm ? filterForm : getState().deal.filter;
    const res = await axios.post(API, {
      metrage_id: metrage_id || null,
      method: 'crm.deal.filter',
      fields: {
        ...curFilter,
        offset: 0,
      },
    });
    if (filterForm) {
      dispatch(setNewFilter(filterForm));
    }
    if (res?.statusText === 'OK') {
      return res?.data?.result || [];
    }
    return [];
  }
);
export const getDealListMore = createAsyncThunk(
  'deal/getDealListMore',
  async (_, { getState, dispatch }) => {
    const res = await axios.post(API, {
      metrage_id: metrage_id || null,
      method: 'crm.deal.filter',
      fields: {
        ...getState().deal.filter,
        offset: getState().deal.offset + 1,
      },
    });
    if (res?.statusText === 'OK') {
      return res?.data?.result || [];
    }
    return [];
  }
);
export const defaultDealFilter = {
  users: [user],
  dealType: 'all',
  status: 'all',
  plannedDate: '',
};
const getFilter = () => {
  const filter = localStorage.getItem('filterDeal');
  if (filter) {
    return JSON.parse(filter);
  }
  return defaultDealFilter;
};
const initialState = {
  loadingList: true,
  loadingMore: false,
  deals: [],
  filter: getFilter(),
  offset: 0,
  buttonMore: false,
};

const dealSlice = createSlice({
  name: 'deal',
  initialState,
  reducers: {
    clearDeals(state, action) {
      state.deals = [];
      state.offset = 0;
    },
    setNewFilter(state, action) {
      state.filter = action.payload;
    },
    resetFilter(state, action) {
      state.filter = defaultDealFilter;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDealList.pending, (state, action) => {
        const isFilter = Boolean(action.meta.arg);
        if (isFilter) {
          state.loadingList = true;
          state.offset = 0;
        }
      })
      .addCase(getDealList.fulfilled, (state, action) => {
        state.loadingList = false;
        state.deals = action.payload;
        if (action.payload.length >= 54) {
          state.buttonMore = true;
          return;
        }
        state.buttonMore = false;
      })
      .addCase(getDealList.rejected, (state) => {
        state.loadingList = false;
      })
      .addCase(getDealListMore.pending, (state, action) => {
        state.loadingMore = true;
      })
      .addCase(getDealListMore.fulfilled, (state, action) => {
        state.loadingMore = false;
        state.deals = [...state.deals, ...action.payload];
        state.offset = state.offset + 1;
        if (action.payload.length >= 54) {
          state.buttonMore = true;
          return;
        }
        state.buttonMore = false;
      })
      .addCase(getDealListMore.rejected, (state) => {
        state.loadingMore = false;
      });
  },
});
export const { clearDeals, setNewFilter, resetFilter } = dealSlice.actions;
export default dealSlice.reducer;
