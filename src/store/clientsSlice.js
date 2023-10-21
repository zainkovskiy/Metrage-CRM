import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API = process.env.MAIN_API;

export const getClientsList = createAsyncThunk(
  'clients/getClientsList',
  async () => {
    const res = await axios.post(API, {
      metrage_id: metrage_id || null,
      method: 'crm.contact.list',
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
  clients: [],
};

export const clientsSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getClientsList.fulfilled, (state, action) => {
      state.loading = false;
      state.clients = action.payload;
    });
  },
});

export const {} = clientsSlice.actions;
export default clientsSlice.reducer;
