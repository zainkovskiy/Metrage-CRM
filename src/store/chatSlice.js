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
export const getCurrentChat = createAsyncThunk(
  'chat/getCurrentChat',
  async (chat, { getState, dispatch }) => {
    const res = await axios.post(API, {
      metrage_id: metrage_id || null,
      method: 'crm.messages.get',
      fields: {
        userId: getState().user.UID,
        chatId: chat.chatId,
      }
    })
    if (res?.statusText === 'OK') {
      dispatch(setTargetAuthor(chat.chatWith));
      return res.data.result;
    }
  }
)

const initialState = {
  ...chatState,
  show: false,
  selectButton: 'notification',
  notification: [],
  chatList: [],
  currentChat: null,
  targetAuthor: null,
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
    },
    setTargetAuthor(state, action) {
      state.targetAuthor = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(getNotification.fulfilled, (state, action) => {
      state.notification = action.payload;
    })
    .addCase(getChatList.fulfilled, (state, action) => {
      state.chatList = action.payload?.chats || [];
    })
    .addCase(getCurrentChat.fulfilled, (state, action) => {
      state.currentChat = action.payload || [];
    })
  }
})

export const { toggleShowChat, setSelectButton, setTargetAuthor } = userSlice.actions;
export default userSlice.reducer;