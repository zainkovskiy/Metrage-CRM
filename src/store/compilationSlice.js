import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const API = process.env.MAIN_API;

export const createNewCompilation = createAsyncThunk(
  'objects/createNewCompilation',
  async (_, { getState, dispatch }) => {
    const res = await axios.post(API, {
      metrage_id: metrage_id || null,
      method: 'crm.compilation.addRoster',
      fields: {
        objects: getState().objects.basket,
      },
    });
    if (res.statusText === 'OK') {
      console.log(res);
    }
  }
);
export const getCompilationList = createAsyncThunk(
  'objects/getCompilationList',
  async () => {
    const res = await axios.post(API, {
      metrage_id: metrage_id || null,
      method: 'crm.compilation.list',
      fields: {
        type: 'roster',
      },
    });
    if (res.statusText === 'OK') {
      return res?.data?.result || [];
    }
  }
);

const initialState = {
  loading: true,
  compilations: [],
};

const compilationSlice = createSlice({
  name: 'compilation',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCompilationList.fulfilled, (state, action) => {
      state.compilations = action.payload;
      state.loading = false;
    });
  },
});

export const {} = compilationSlice.actions;
export default compilationSlice.reducer;
