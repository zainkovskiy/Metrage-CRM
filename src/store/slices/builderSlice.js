import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const API = process.env.MAIN_API;

export const getBuilderList = createAsyncThunk(
  'builder/getBuilderList',
  async (filterForm, { getState, dispatch }) => {
    // const curFilter = filterForm ? filterForm : getState().deal.filter;
    const res = await axios.post(API, {
      metrage_id: metrage_id || null,
      method: 'crm.developers.filter',
      // fields: {
      //   ...curFilter,
      //   offset: 0,
      // },
    });
    // if (filterForm) {
    //   dispatch(setNewFilter(filterForm));
    // }
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

const initialState = {
  builders: [],
  loadingList: true,
};

const builderSlice = createSlice({
  name: 'builder',
  initialState,
  reducers: {
    addNewBuilder(state, action) {
      state.builders = [action.payload, ...state.builders];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBuilderList.fulfilled, (state, action) => {
        state.builders = action.payload;
        state.loadingList = false;
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
        // const findBuilder = state.builders.find(
        //   (builders) => builders.UID === curBuilder.UID
        // );
        // if (!findBuilder) {
        //   return;
        // }
        // if (JSON.stringify(curBuilder) === JSON.stringify(findBuilder)) {
        //   return;
        // }
        // state.builders.splice(
        //   state.builders.indexOf(findBuilder),
        //   1,
        //   curBuilder
        // );
      });
  },
});

export const { addNewBuilder } = builderSlice.actions;
export default builderSlice.reducer;
