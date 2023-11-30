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
export const addNewDeal = createAsyncThunk('deal/addNewDeal', async (UID) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.deal.filter',
    fields: {
      UID: UID,
    },
  });
  if (res?.statusText === 'OK') {
    return res?.data?.result || {};
  }
  return {};
});
export const getSliceMiniCard = createAsyncThunk(
  'deal/getSliceMiniCard',
  async (UID) => {
    const res = await axios.post(API, {
      metrage_id: metrage_id || null,
      method: 'crm.deal.filter',
      fields: {
        UID: UID,
      },
    });
    if (res?.statusText === 'OK') {
      return res?.data?.result || {};
    }
    return {};
  }
);
export const defaultDealFilter = {
  users: [user],
  office: '',
  dealType: 'all',
  status: 'all',
  plannedDateFrom: '',
  plannedDateTo: '',
  actualDateFrom: '',
  actualDateTo: '',
  lawyer: '',
  sortName: null,
  agentsCalculated: 'all',
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
  viewCard: 'cell',
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
    resetFilter(state) {
      state.filter = defaultDealFilter;
    },
    setViewCard(state, action) {
      state.viewCard = action.payload;
    },
    setSortFilterName(state, action) {
      state.sortName = action.payload;
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
      })
      .addCase(getSliceMiniCard.fulfilled, (state, action) => {
        const curDeal = action.payload;
        const findDeal = state.deals.find((deal) => deal.UID === curDeal.UID);
        if (!findDeal) {
          return;
        }
        if (JSON.stringify(curDeal) === JSON.stringify(findDeal)) {
          return;
        }
        state.deals.splice(state.deals.indexOf(findDeal), 1, curDeal);
      })
      .addCase(addNewDeal.fulfilled, (state, action) => {
        state.deals = [action.payload, ...state.deals];
      });
  },
});
export const {
  clearDeals,
  setNewFilter,
  resetFilter,
  setViewCard,
  setSortFilterName,
} = dealSlice.actions;
export default dealSlice.reducer;
