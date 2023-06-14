import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";

export const getTelegramCode = createAsyncThunk(
  'telegram/getTelegramCode',
  async (userId) => {
    const res = await axios.post('https://crm.metragegroup.com/API/TelegramHook.php', {
      getCode: userId
    })
    return res;
  }
)
export const telegramDiscription = createAsyncThunk(
  'telegram/telegramDiscription',
  async (userId) => {
    const res = await axios.post('https://crm.metragegroup.com/API/TelegramHook.php', {
      unsubscribe: userId
    })
    return res;
  }
)
const user = globalUser ? JSON.parse(globalUser) : null;

const initialState = {
  loading: false,
  code: null,
  error: false,
  subscription: user?.telegramChatId || false,
}
const telegramSlice = createSlice({
  name: 'telegram',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(getTelegramCode.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getTelegramCode.fulfilled, (state, action) => {
        const { data } = action.payload;
        if (data && data?.result === 'OK') {
          state.code = data?.code;
        };
        state.loading = false;
      })
      .addCase(getTelegramCode.rejected, (state) => {
        state.error = true;
      })
      .addCase(telegramDiscription.fulfilled, (state, action) => {
        const { data } = action.payload;
        if (data && data?.result === 'OK') {
          state.subscription = false;
        };
      })
  }
})

export const { } = telegramSlice.actions;
export default telegramSlice.reducer; 