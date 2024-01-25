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
// export const getPlanMiniCard = createAsyncThunk(
//   'plans/getPlanMiniCard',
//   async (id) => {
//     const res = await axios.post(API, {
//       metrage_id: metrage_id || null,
//       method: 'crm.plans.getOne',
//       fields: {
//         UID: id,
//       },
//     });
//     if (res?.statusText === 'OK') {
//       return res?.data?.result || {};
//     }
//     return null;
//   }
// );

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
    builder.addCase(getBuilderList.fulfilled, (state, action) => {
      state.builders = action.payload;
      state.loadingList = false;
    });
    // .addCase(getPlanMiniCard.fulfilled, (state, action) => {
    //   const curPlan = action.payload;
    //   const findPlan = state.plans.find((plan) => plan.UID === curPlan.UID);
    //   if (!findPlan) {
    //     return;
    //   }
    //   if (JSON.stringify(curPlan) === JSON.stringify(findPlan)) {
    //     return;
    //   }
    //   state.plans.splice(state.plans.indexOf(findPlan), 1, curPlan);
    // });
  },
});

export const { addNewBuilder } = builderSlice.actions;
export default builderSlice.reducer;
