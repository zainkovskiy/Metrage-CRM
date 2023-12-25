import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const API = process.env.MAIN_API;
import { clearBasket } from '../store/objectSlice';

//создание новой подборки
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
      dispatch(clearBasket());
    }
  }
);
//добавть объекты в существующую подборку
export const addToCompilation = createAsyncThunk(
  'objects/addToCompilation',
  async (id, { getState, dispatch }) => {
    const res = await axios.post(API, {
      metrage_id: metrage_id || null,
      method: 'crm.compilation.addRosterItems',
      fields: {
        UID: id,
        objects: getState().objects.basket,
      },
    });
    if (res.statusText === 'OK') {
      dispatch(clearBasket());
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
export const removeCompilationItem = createAsyncThunk(
  'objects/removeCompilationItem',
  async (id, { dispatch }) => {
    const res = await axios.post(API, {
      metrage_id: metrage_id || null,
      method: 'crm.compilation.delRosterItems',
      fields: {
        UID: id,
      },
    });
    if (res.statusText === 'OK') {
      dispatch(getCompilationList());
      return 'OK';
    }
  }
);
export const removeCompilation = createAsyncThunk(
  'objects/removeCompilation',
  async (id, { dispatch }) => {
    const res = await axios.post(API, {
      metrage_id: metrage_id || null,
      method: 'crm.compilation.delRoster',
      fields: {
        UID: id,
      },
    });
    if (res.statusText === 'OK') {
      dispatch(getCompilationList());
      return 'OK';
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
