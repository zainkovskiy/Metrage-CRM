import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const API = process.env.MAIN_API;

export const getEventList = createAsyncThunk(
  'calendar/getEventList',
  async (filterForm, { getState, dispatch }) => {
    // const curFilter = filterForm ? filterForm : getState().residential.filter;
    const res = await axios.post(API, {
      metrage_id: metrage_id || null,
      method: 'crm.calendar.get',
      fields: {
        // ...curFilter,
      },
    });
    // if (filterForm) {
    //   dispatch(setNewFilter(filterForm));
    // }
    if (res?.statusText === 'OK') {
      return res?.data?.result || {};
    }
    return {};
  }
);
export const createNewEvent = createAsyncThunk(
  'calendar/createNewEvent',
  async (raw) => {
    const res = await axios.post(API, {
      metrage_id: metrage_id || null,
      method: 'crm.calendar.addNotify',
      fields: raw,
    });
    if (res?.statusText === 'OK') {
      return res?.data?.result || {};
    }
    return {};
  }
);
export const updateEvent = createAsyncThunk(
  'calendar/updateEvent',
  async (event) => {
    const res = await axios.post(API, {
      metrage_id: metrage_id || null,
      method: 'crm.calendar.updNotify',
      fields: event,
    });
    if (res?.statusText === 'OK') {
      return res?.data?.result || {};
    }
    return {};
  }
);
export const removeEvent = createAsyncThunk(
  'calendar/removeEvent',
  async (UID) => {
    const res = await axios.post(API, {
      metrage_id: metrage_id || null,
      method: 'crm.calendar.delNotify',
      fields: {
        UID: UID,
      },
    });
    if (res?.statusText === 'OK') {
      return UID;
    }
    return 'No OK';
  }
);

// export const defaultResidentialFilter = {
//   devId: '',
//   isBuild: false,
//   hasVariants: true,
//   deadLine: '',
//   JKType: '',
// };
// const getFilter = () => {
//   const filter = localStorage.getItem('filterResidential');
//   if (filter) {
//     return JSON.parse(filter);
//   }
//   return defaultResidentialFilter;
// };
const initialState = {
  events: {},
  loadingList: true,
};

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    // addNewResidential(state, action) {
    //   state.residentials = [action.payload, ...state.residentials];
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(getEventList.fulfilled, (state, action) => {
      state.events = action.payload;
      state.loadingList = false;
    }),
      builder.addCase(createNewEvent.fulfilled, (state, action) => {
        state.events.data = [...state.events.data, action.payload];
      }),
      builder.addCase(removeEvent.fulfilled, (state, action) => {
        const eventUID = action.payload;
        state.events.data = state.events.data.filter(
          (event) => event.UID !== eventUID
        );
      }),
      builder.addCase(updateEvent.fulfilled, (state, action) => {
        const curEvent = action.payload;
        if (curEvent) {
          state.events.data = state.events.data.map((item) => {
            if (item.UID === curEvent.UID) {
              return curEvent;
            }
            return item;
          });
        }
      });
  },
});

export const {} = calendarSlice.actions;
export default calendarSlice.reducer;
