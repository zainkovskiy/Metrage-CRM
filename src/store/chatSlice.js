import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const chatState = globalMessages ? JSON.parse(globalMessages) : null;

const initialState = {
  ...chatState,
  show: false,
};


const userSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    toggleShowChat(state) {
      state.show = !state.show;
    }
  },
  extraReducers: {
  }
})

export const { toggleShowChat } = userSlice.actions;
export default userSlice.reducer;