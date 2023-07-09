import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = globalUser ? JSON.parse(globalUser) : null;

export const logOutAPI = createAsyncThunk(
  'user/logOutAPI',
  async () => {
    await axios.post('https://crm.metragegroup.com/API/Login.php', {
      logout: true,
    });
    console.log(res);
  }
)

const userSlice = createSlice({
  name: 'user',
  windowDevice: null,
  initialState,
  reducers: {
    setWindowDevice(state, action) {
      state.windowDevice = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logOutAPI.fulfilled, () => {
        location.reload();
      })
      .addCase(logOutAPI.rejected, () => {
        location.reload();
      })
  }
})

export const { setWindowDevice } = userSlice.actions;
export default userSlice.reducer;