import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const API = process.env.MAIN_API;

export const getFixationList = createAsyncThunk(
  'fixation/getFixationList',
  async (filterForm, { getState, dispatch }) => {
    const curFilter = filterForm ? filterForm : getState().fixation.filter;
    const res = await axios.post(API, {
      metrage_id: metrage_id || null,
      method: 'crm.clientfixation.filter',
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
export const getFixationListMore = createAsyncThunk(
  'fixation/getFixationListMore',
  async (_, { getState }) => {
    const res = await axios.post(API, {
      metrage_id: metrage_id || null,
      method: 'crm.clientfixation.filter',
      fields: {
        ...getState().fixation.filter,
        offset: getState().fixation.offset + 1,
      },
    });
    if (res?.statusText === 'OK') {
      return res?.data?.result || null;
    }
    return null;
  }
);
export const getFixationOne = createAsyncThunk(
  'fixation/getFixationOne',
  async (UID) => {
    const res = await axios.post(API, {
      metrage_id: metrage_id || null,
      method: 'crm.clientfixation.filter',
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
export const createFixation = createAsyncThunk(
  'fixation/createFixation',
  async (newFixed, { dispatch }) => {
    const res = await axios.post(API, {
      metrage_id: metrage_id || null,
      method: 'crm.clientfixation.create',
      fields: newFixed,
    });
    if (res?.statusText === 'OK') {
      const data = res.data;
      if (data?.result?.UID) {
        const newUID = data?.result?.UID;
        dispatch(getFixationOne(newUID));
      }
    }
  }
);
export const updateFixation = createAsyncThunk(
  'fixation/updateFixation',
  async (updateFixation, { dispatch }) => {
    const res = await axios.post(API, {
      metrage_id: metrage_id || null,
      method: 'crm.clientfixation.update',
      fields: updateFixation,
    });
    if (res?.statusText === 'OK') {
      const data = res.data;
      if (data?.result?.UID) {
        const updateID = data?.result?.UID;
        dispatch(getFixationOne(updateID));
      }
    }
  }
);
export const changeFixationStage = createAsyncThunk(
  'fixation/changeFixationStage',
  async (raw, { dispatch }) => {
    const res = await axios.post(API, {
      metrage_id: metrage_id || null,
      method: 'crm.clientfixation.setStage',
      fields: raw,
    });
    if (res.statusText === 'OK') {
      dispatch(getFixationOne(raw.UID));
    }
  }
);
export const defaultFixationFilter = {
  fixationType: '',
  typeObject: '',
  suburbanType: '',
  realtor: '',
  office: '',
  stageId: '',
  jk: '',
  developer: '',
};
const getFilter = () => {
  const filter = localStorage.getItem('clientFixation');
  if (filter) {
    return JSON.parse(filter);
  }
  return defaultFixationFilter;
};
const initialState = {
  hopper: [],
  // stageList: [],
  fixationList: [],
  loadingList: true,
  filter: getFilter(),
  buttonMore: false,
  loadingMore: false,
  offset: 0,
};

const fixationSlice = createSlice({
  name: 'fixation',
  initialState,
  reducers: {
    resetFixationFilter(state) {
      state.filter = defaultFixationFilter;
    },
    setNewFilter(state, action) {
      state.filter = action.payload;
    },
    cleareFixation(state) {
      state.fixationList = [];
      state.loadingList = true;
      state.offset = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getFixationList.fulfilled, (state, action) => {
      state.hopper = action.payload.hopper;
      state.fixationList = action.payload.bids;
      // state.stageList = action.payload.stages;
      state.loadingList = false;
      if (action.payload.bids.length < 50) {
        state.buttonMore = false;
        return;
      }
      state.buttonMore = true;
    }),
      builder.addCase(getFixationListMore.pending, (state, action) => {
        state.loadingMore = true;
      }),
      builder.addCase(getFixationListMore.fulfilled, (state, action) => {
        state.loadingMore = false;
        state.hopper = action.payload.hopper;
        state.fixationList = [...state.fixationList, ...action.payload.bids];
        state.offset = state.offset + 1;
        if (action.payload.bids.length < 50) {
          state.buttonMore = false;
          return;
        }
        state.buttonMore = true;
      }),
      builder.addCase(getFixationOne.fulfilled, (state, action) => {
        const curFixation = action.payload;
        const findFixation = state.fixationList.find(
          (fixation) => fixation.UID === curFixation.UID
        );
        if (!findFixation) {
          state.fixationList = [curFixation, ...state.fixationList];
          return;
        }
        if (JSON.stringify(curFixation) === JSON.stringify(findFixation)) {
          return;
        }
        state.fixationList.splice(
          state.fixationList.indexOf(findFixation),
          1,
          curFixation
        );
      });
  },
});

export const { resetFixationFilter, setNewFilter, cleareFixation } =
  fixationSlice.actions;
export default fixationSlice.reducer;
