import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API = process.env.MAIN_API;

export const getClientsList = createAsyncThunk(
  'clients/getClientsList',
  async () => {
    const res = await axios.post(API, {
      metrage_id: metrage_id || null,
      method: 'crm.contact.list',
      fields: {
        offset: 0,
      },
    });
    if (res?.statusText === 'OK') {
      return res?.data?.result?.transwerData || [];
    }
    return [];
  }
);
export const getMoreClientsList = createAsyncThunk(
  'clients/getMoreClientsList',
  async (_, { getState }) => {
    const res = await axios.post(API, {
      metrage_id: metrage_id || null,
      method: 'crm.contact.list',
      fields: {
        offset: getState().clients.offset + 1,
      },
    });
    if (res?.statusText === 'OK') {
      return res?.data?.result?.transwerData || [];
    }
    return [];
  }
);
export const saveChangeContact = createAsyncThunk(
  'clients/saveChangeContact',
  async (raw, { dispatch }) => {
    const res = await axios.post(API, {
      metrage_id: metrage_id || null,
      method: 'crm.contact.update',
      fields: raw,
    });
    if (res?.statusText === 'OK') {
      return dispatch(getClientsList());
    }
  }
);
export const changeClientResponsible = createAsyncThunk(
  'clients/changeClientResponsible',
  async (raw, { dispatch }) => {
    const res = await axios.post(API, {
      metrage_id: metrage_id || null,
      method: 'crm.contact.setResponsible',
      fields: raw,
    });
    if (res?.statusText === 'OK') {
      return dispatch(getClientsList());
    }
  }
);

const initialState = {
  loading: true,
  loadingMore: false,
  buttonMore: false,
  clients: [],
  offset: 0,
};

export const clientsSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getClientsList.fulfilled, (state, action) => {
      state.loading = false;
      state.clients = action.payload;
      if (action.payload.length < 54) {
        state.buttonMore = false;
        return;
      }
      state.buttonMore = true;
    }),
      builder.addCase(getMoreClientsList.pending, (state, action) => {
        state.loadingMore = true;
      }),
      builder.addCase(getMoreClientsList.fulfilled, (state, action) => {
        state.clients = [...state.clients, ...action.payload];
        state.loadingMore = false;
        state.offset++;
        if (action.payload.length < 54) {
          state.buttonMore = false;
          return;
        }
        state.buttonMore = true;
      });
  },
});

export const {} = clientsSlice.actions;
export default clientsSlice.reducer;
