import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const API = process.env.MAIN_API;

export const getBuilderList = createAsyncThunk(
  'builder/getBuilderList',
  async (filterForm, { getState, dispatch }) => {
    const curFilter = filterForm ? filterForm : getState().builder.filter;
    const res = await axios.post(API, {
      metrage_id: metrage_id || null,
      method: 'crm.developers.filter',
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
export const getBuilderListMore = createAsyncThunk(
  'builder/getBuilderListMore',
  async (_, { getState, dispatch }) => {
    const res = await axios.post(API, {
      metrage_id: metrage_id || null,
      method: 'crm.developers.filter',
      fields: {
        ...getState().builder.filter,
        offset: getState().builder.offset + 1,
      },
    });
    if (res?.statusText === 'OK') {
      return res?.data?.result || [];
    }
    return [];
  }
);
export const getBuilderMiniCard = createAsyncThunk(
  'builder/getBuilderMiniCard',
  async (id) => {
    const res = await axios.post(API, {
      metrage_id: metrage_id || null,
      method: 'crm.developers.filter',
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
export const defaultBuilderFilter = {
  devType: '',
  region: '',
  comissionSize: '',
  onProcessHouses: false,
};
const getFilter = () => {
  const filter = localStorage.getItem('filterBuilder');
  if (filter) {
    return JSON.parse(filter);
  }
  return defaultBuilderFilter;
};
const initialState = {
  builders: [],
  loadingList: true,
  filter: getFilter(),
  buttonMore: false,
  loadingMore: false,
  offset: 0,
};

const builderSlice = createSlice({
  name: 'builder',
  initialState,
  reducers: {
    addNewBuilder(state, action) {
      state.builders = [action.payload, ...state.builders];
    },
    resetFilter(state) {
      state.filter = defaultBuilderFilter;
    },
    setNewFilter(state, action) {
      state.filter = action.payload;
    },
    cleareBuilders(state, action) {
      state.builders = [];
      state.offset = 0;
      state.loadingList = true;
      state.loadingMore = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBuilderList.fulfilled, (state, action) => {
        state.builders = action.payload;
        state.loadingList = false;
        if (action.payload.length < 100) {
          state.buttonMore = false;
          return;
        }
        state.buttonMore = true;
      })
      .addCase(getBuilderMiniCard.fulfilled, (state, action) => {
        const curBuilder = action.payload;
        if (curBuilder) {
          state.builders = state.builders.map((item) => {
            if (item.UID === curBuilder.UID) {
              return { ...curBuilder };
            }
            return item;
          });
        }
      })
      .addCase(getBuilderListMore.pending, (state, action) => {
        state.loadingMore = true;
      })
      .addCase(getBuilderListMore.fulfilled, (state, action) => {
        state.loadingMore = false;
        state.builders = [...state.builders, ...action.payload];
        state.offset = state.offset + 1;
        if (action.payload.length < 100) {
          state.buttonMore = false;
          return;
        }
        state.buttonMore = true;
      })
      .addCase(getBuilderListMore.rejected, (state) => {
        state.loadingMore = false;
      });
  },
});

export const { addNewBuilder, resetFilter, setNewFilter, cleareBuilders } =
  builderSlice.actions;
export default builderSlice.reducer;
