import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const API = process.env.MAIN_API;

export const getMortageList = createAsyncThunk(
  'mortage/getMortageList',
  async (filterForm, { getState, dispatch }) => {
    const curFilter = filterForm ? filterForm : getState().mortage.filter;
    const res = await axios.post(API, {
      metrage_id: metrage_id || null,
      method: 'crm.mortgage.filter',
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
export const getMortageListMore = createAsyncThunk(
  'mortage/getMortageListMore',
  async (_, { getState }) => {
    const res = await axios.post(API, {
      metrage_id: metrage_id || null,
      method: 'crm.mortgage.filter',
      fields: {
        ...getState().mortage.filter,
        offset: getState().mortage.offset + 1,
      },
    });
    if (res?.statusText === 'OK') {
      return res?.data?.result || null;
    }
    return null;
  }
);
export const checkOneMortage = createAsyncThunk(
  'mortage/checkOneMortage',
  async (UID) => {
    const res = await axios.post(API, {
      metrage_id: metrage_id || null,
      method: 'crm.mortgage.filter',
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
export const changeMortageStage = createAsyncThunk(
  'mortage/changeMortageStage',
  async (raw, { dispatch }) => {
    const res = await axios.post(API, {
      metrage_id: metrage_id || null,
      method: 'crm.mortgage.setStage',
      fields: raw,
    });
    if (res.statusText === 'OK') {
      dispatch(checkOneMortage(raw.UID));
    }
  }
);
export const changeMortageUser = createAsyncThunk(
  'mortage/changeMortageUser',
  async (raw, { dispatch }) => {
    const res = await axios.post(API, {
      metrage_id: metrage_id || null,
      method: 'crm.mortgage.setResponsible',
      fields: raw,
    });
    if (res.statusText === 'OK') {
      dispatch(checkOneMortage(raw.UID));
    }
  }
);
export const saveMortageSlide = createAsyncThunk(
  'mortage/saveMortageSlide',
  async (raw, { dispatch }) => {
    const res = await axios.post(API, {
      metrage_id: metrage_id || null,
      method: 'crm.mortgage.update',
      fields: raw,
    });
    if (res.statusText === 'OK') {
      dispatch(checkOneMortage(raw.UID));
    }
  }
);
export const defaultMortageFilter = {
  stageId: '',
  createdFrom: '',
  createdTo: '',
  broker: '',
  typeRealty: '',
  isConsultation: false,
};
const getFilter = () => {
  const filter = localStorage.getItem('filterMortage');
  if (filter) {
    return JSON.parse(filter);
  }
  return defaultMortageFilter;
};
const initialState = {
  hopper: [],
  stageList: [],
  mortageList: [],
  loadingList: true,
  filter: getFilter(),
  buttonMore: false,
  loadingMore: false,
  offset: 0,
};

const mortageSlice = createSlice({
  name: 'mortage',
  initialState,
  reducers: {
    resetMortageFilter(state) {
      state.filter = defaultMortageFilter;
    },
    setNewFilter(state, action) {
      state.filter = action.payload;
    },
    clearMortage(state, action) {
      state.hopper = [];
      state.stageList = [];
      state.mortageList = [];
      state.loadingList = true;
      state.offset = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMortageList.fulfilled, (state, action) => {
      state.mortageList = action.payload.data;
      state.stageList = action.payload.stages;
      state.hopper = action.payload.hopper;
      state.loadingList = false;
      if (action.payload.data.length < 50) {
        state.buttonMore = false;
        return;
      }
      state.buttonMore = true;
    }),
      builder.addCase(getMortageListMore.pending, (state, action) => {
        state.loadingMore = true;
      }),
      builder.addCase(getMortageListMore.fulfilled, (state, action) => {
        state.loadingMore = false;
        state.mortageList = [...state.mortageList, ...action.payload.data];
        state.stageList = action.payload.stages;
        state.hopper = action.payload.hopper;
        state.offset = state.offset + 1;
        if (action.payload.data.length < 50) {
          state.buttonMore = false;
          return;
        }
        state.buttonMore = true;
      }),
      builder.addCase(checkOneMortage.fulfilled, (state, action) => {
        const curMortage = action.payload;
        const findMortage = state.mortageList.find(
          (mortage) => mortage.UID === curMortage.UID
        );
        if (!findMortage) {
          state.mortageList = [curMortage, ...state.mortageList];
          return;
        }
        if (JSON.stringify(curMortage) === JSON.stringify(findMortage)) {
          return;
        }
        state.mortageList.splice(
          state.mortageList.indexOf(findMortage),
          1,
          curMortage
        );
      });
  },
});

export const { resetMortageFilter, setNewFilter, clearMortage } =
  mortageSlice.actions;
export default mortageSlice.reducer;
