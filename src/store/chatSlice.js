import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const chatState = globalMessages ? JSON.parse(globalMessages) : null;
const API = 'https://crm.metragegroup.com/API/REST.php';

export const getNotification = createAsyncThunk(
  'chat/getNotification',
  async (_, { getState }) => {
    const res = await axios.post(API, {
      metrage_id: metrage_id || null,
      method: 'crm.notifications.get',
      fields: {
        userId: getState().user.UID,
      }
    })
    if (res?.statusText === 'OK') {
      return res?.data?.result;
    }
  }
)

export const getChatList = createAsyncThunk(
  'chat/getChatList',
  async (_, { getState }) => {
    const res = await axios.post(API, {
      metrage_id: metrage_id || null,
      method: 'crm.messages.list',
      fields: {
        userId: getState().user.UID,
      }
    })
    if (res?.statusText === 'OK') {
      return res?.data?.result;
    }
  }
)

const initialState = {
  ...chatState,
  show: false,
  selectButton: 'notification',
  notification: [],
  chatList: [],
};

const userSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    toggleShowChat(state) {
      state.show = !state.show;
    },
    setSelectButton(state, action) {
      state.selectButton = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(getNotification.fulfilled, (state, action) => {
      state.notification = action.payload;
    })
    .addCase(getChatList.fulfilled, (state, action) => {
      state.chatList = action.payload;
    })
  }
})

export const { toggleShowChat, setSelectButton } = userSlice.actions;
export default userSlice.reducer;