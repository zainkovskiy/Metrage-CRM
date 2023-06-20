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
export const createNewChat = createAsyncThunk(
  'chat/createNewChat',
  async (user, { getState, dispatch }) => {
    try {
      const findChat = getState().chat.chatList.find((chat) => chat?.chatWith?.UID.toString() === user.UID.toString());
      if (findChat) {
        dispatch(getCurrentChat(findChat));
        return
      }
      const res = await axios.post(API, {
        metrage_id: metrage_id || null,
        method: 'crm.messages.add',
        fields: {
          userId: getState().user.UID,
          members: [user.UID],
        }
      })
      if (res?.statusText === 'OK') {
        dispatch(setTargetAuthor(user));
        return res.data;
      }
    } catch (error) {
      dispatch(toggleShowChat());
    } finally {
      dispatch(setSelectButton('chat'));
    }
  }
)
export const sendChatMessage = createAsyncThunk(
  'chat/sendChatMessage',
  async (message, { getState, dispatch }) => {
    const res = await axios.post(API, {
      metrage_id: metrage_id || null,
      method: 'crm.messages.send',
      fields: {
        userId: getState().user.UID,
        chatId: getState().chat.currentChat.chatId,
        message: message,
      }
    })
    if (res?.statusText === 'OK') {
      dispatch(setLastMesssage(res.data.result));
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
  chatLoading: false,
  targetAuthor: null,
};

const userSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    toggleShowChat(state) {
      state.show = !state.show;
      state.currentChat = null;
      state.targetAuthor = null
      state.selectButton = 'notification'
    },
    setSelectButton(state, action) {
      state.selectButton = action.payload;
    },
    setTargetAuthor(state, action) {
      state.targetAuthor = action.payload;
    },
    setLastMesssage(state, action) {
      const message = action.payload;
      const findChat = state.chatList.chats.find((chat) => chat?.chatWith?.UID.toString() === state.targetAuthor.UID.toString());
      findChat.lastMessage = message;
      state.chatList.chats.splice(state.chatList.chats.indexOf(findChat), 1, findChat);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNotification.fulfilled, (state, action) => {
        state.notification = action.payload;
      })
      .addCase(getChatList.fulfilled, (state, action) => {
        state.chatList = action.payload || null;
      })
      .addCase(getCurrentChat.pending, (state, action) => {
        state.chatLoading = true;
      })
      .addCase(getCurrentChat.fulfilled, (state, action) => {
        state.currentChat = action.payload || null;
        state.chatLoading = false;
      })
      .addCase(sendChatMessage.fulfilled, (state, action) => {
        const message = action.payload;
        state.currentChat.messages = [...state.currentChat.messages, message];
      })
      .addCase(createNewChat.fulfilled, (state, action) => {
        const chatId = action.payload?.result?.chatId;
        state.currentChat = {
          chatId: chatId,
          messages: []
        }
      })
  }
})

export const { toggleShowChat, setSelectButton, setTargetAuthor, setLastMesssage } = userSlice.actions;
export default userSlice.reducer;