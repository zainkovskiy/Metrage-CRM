import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const API = process.env.MAIN_API;

export const getUsersList = createAsyncThunk(
  'users/getUsersList',
  async (_, { getState, dispatch }) => {
    const res = await axios.post(API, {
      metrage_id: metrage_id || null,
      method: 'crm.users.filter',
      fields: {},
    });

    if (res?.statusText === 'OK') {
      return res?.data?.result || [];
    }
    return [];
  }
);

const initialState = {
  users: [],
  loadingList: true,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // setWindowDevice(state, action) {
    //   state.windowDevice = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(getUsersList.fulfilled, (state, action) => {
      state.users = action.payload;
      state.loadingList = false;
    });
  },
});

export const {} = usersSlice.actions;
export default usersSlice.reducer;
