import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const API = process.env.MAIN_API;

export const getResidentialList = createAsyncThunk(
  'residential/getResidentialList',
  async (filterForm, { getState, dispatch }) => {
    const curFilter = filterForm ? filterForm : getState().residential.filter;
    const res = await axios.post(API, {
      metrage_id: metrage_id || null,
      method: 'crm.jk.filter2',
      fields: {
        ...curFilter,
        offset: 0,
        mode: getState().residential.viewCard,
        model: getState().residential.modelFilter,
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
export const getResidentialListMore = createAsyncThunk(
  'residential/getResidentialListMore',
  async (_, { getState, dispatch }) => {
    const res = await axios.post(API, {
      metrage_id: metrage_id || null,
      method: 'crm.jk.filter',
      fields: {
        ...getState().residential.filter,
        offset: getState().residential.offset + 1,
      },
    });
    if (res?.statusText === 'OK') {
      return res?.data?.result || [];
    }
    return [];
  }
);
export const getResidentialMiniCard = createAsyncThunk(
  'residential/getResidentialMiniCard',
  async (id) => {
    const res = await axios.post(API, {
      metrage_id: metrage_id || null,
      method: 'crm.jk.filter',
      fields: {
        UID: id,
      },
    });
    if (res?.statusText === 'OK') {
      return res?.data?.result || {};
    }
    return null;
  }
);
export const defaultResidentialFilter = {
  devId: '',
  isBuild: false,
  hasVariants: true,
  deadLine: '',
  JKType: '',
  hasComission: false,
  hasHouse: false,
  hasLand: false,
  hasWater: false,
  hasElectricity: false,
  hasGas: false,
  hasAccreditation: [],
  hasComission: false,
};
const getFilter = () => {
  const filter = localStorage.getItem('filterResidential');
  if (filter) {
    return JSON.parse(filter);
  }
  return defaultResidentialFilter;
};
const initialState = {
  residentials: [],
  schema: {},
  loadingList: true,
  filter: getFilter(),
  buttonMore: false,
  loadingMore: false,
  offset: 0,
  viewCard: 'map',
  modelFilter: 'ЖК-БЦ',
};

const residentialSlice = createSlice({
  name: 'residential',
  initialState,
  reducers: {
    addNewResidential(state, action) {
      state.residentials = [action.payload, ...state.residentials];
    },
    resetFilter(state) {
      state.filter = defaultResidentialFilter;
    },
    setNewFilter(state, action) {
      state.filter = action.payload;
    },
    clearResidentials(state, action) {
      state.residentials = [];
      state.offset = 0;
      state.loadingList = true;
      state.loadingMore = false;
    },
    setViewCard(state, action) {
      state.viewCard = action.payload;
    },
    changeModelFilter(state, action) {
      state.modelFilter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getResidentialList.fulfilled, (state, action) => {
        state.residentials = action.payload.data;
        state.schema = action.payload.schema;
        state.loadingList = false;
        state.offset = 0;
        if (action.payload.length < 54) {
          state.buttonMore = false;
          return;
        }
        state.buttonMore = true;
      })
      .addCase(getResidentialMiniCard.fulfilled, (state, action) => {
        const curResidential = action.payload;
        if (curResidential) {
          state.residentials = state.residentials.map((item) => {
            if (item.UID === curResidential.UID) {
              return { ...curResidential };
            }
            return item;
          });
        }
      })
      .addCase(getResidentialListMore.pending, (state, action) => {
        state.loadingMore = true;
      })
      .addCase(getResidentialListMore.fulfilled, (state, action) => {
        state.loadingMore = false;
        state.residentials = [...state.residentials, ...action.payload.data];
        state.offset = state.offset + 1;
        if (action.payload.length < 54) {
          state.buttonMore = false;
          return;
        }
        state.buttonMore = true;
      })
      .addCase(getResidentialListMore.rejected, (state) => {
        state.loadingMore = false;
      });
  },
});

export const {
  clearResidentials,
  setViewCard,
  resetFilter,
  setNewFilter,
  addNewResidential,
  changeModelFilter,
} = residentialSlice.actions;
export default residentialSlice.reducer;
