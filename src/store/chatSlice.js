import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { useFindCurrentChat } from 'hooks/ChatHooks';

const counter = globalCounter ? JSON.parse(globalCounter) : 0;
const API = 'https://crm.metragegroup.com/API/REST.php';

export const getNotification = createAsyncThunk(
  'chat/getNotification',
  async (_, { getState }) => {
    const res = await axios.post(API, {
      metrage_id: metrage_id || null,
      method: 'crm.notifications.get',
      fields: {
        userId: getState().user.UID,
      },
    });
    if (res?.statusText === 'OK') {
      return res?.data?.result;
    }
  }
);
export const getChatList = createAsyncThunk(
  'chat/getChatList',
  async (socket, { getState, dispatch }) => {
    if (!socket) {
      dispatch(clearCurrentChat());
    }
    const res = await axios.post(API, {
      metrage_id: metrage_id || null,
      // method: 'crm.messages.list',
      method: 'crm.messages.listV2',
      fields: {
        userId: getState().user.UID,
        offset: 0,
      },
    });
    if (getState().user.windowDevice <= 425 || socket) {
      return res?.data?.result;
    }
    if (res?.statusText === 'OK') {
      const selectButton = getState().chat.selectButton;
      if (selectButton !== 'notification') {
        const findChat = useFindCurrentChat(res.data.result, selectButton);
        if (findChat) {
          dispatch(getCurrentChat(findChat));
        }
      }
      return res?.data?.result;
    }
  }
);
export const getChatListMore = createAsyncThunk(
  'chat/getChatListMore',
  async (_, { getState }) => {
    const res = await axios.post(API, {
      metrage_id: metrage_id || null,
      // method: 'crm.messages.list',
      method: 'crm.messages.listV2',
      fields: {
        userId: getState().user.UID,
        offset: getState().chat.offset + 1,
      },
    });
    if (res?.statusText === 'OK') {
      return res?.data?.result;
    }
  }
);
export const getListSearch = createAsyncThunk(
  'chat/getListSearch',
  async (value, { getState }) => {
    const res = await axios.post(API, {
      metrage_id: metrage_id || null,
      method: 'crm.messages.getByReq',
      fields: {
        userId: getState().user.UID,
        request: value,
      },
    });
    if (res?.statusText === 'OK') {
      return res?.data?.result;
    }
  }
);
export const getCurrentChat = createAsyncThunk(
  'chat/getCurrentChat',
  async (chat, { getState, dispatch }) => {
    const res = await axios.post(API, {
      metrage_id: metrage_id || null,
      method: 'crm.messages.get',
      fields: {
        userId: getState().user.UID,
        chatId: chat.chatId,
      },
    });
    if (res?.statusText === 'OK') {
      dispatch(setTargetAuthor(chat.chatWith));
      return res.data.result;
    }
  }
);
export const createNewChat = createAsyncThunk(
  'chat/createNewChat',
  async (user, { getState, dispatch }) => {
    try {
      const findChat = getState().chat.chatList.chats.find(
        (chat) => chat?.chatWith?.UID.toString() === user.UID.toString()
      );
      if (findChat) {
        dispatch(getCurrentChat(findChat));
        return;
      }
      const res = await axios.post(API, {
        metrage_id: metrage_id || null,
        method: 'crm.messages.add',
        fields: {
          userId: getState().user.UID,
          members: [user.UID],
        },
      });
      if (res?.statusText === 'OK') {
        dispatch(setTargetAuthor(user));
        dispatch(getChatList());
        return res.data;
      }
    } catch (error) {
      dispatch(toggleShowChat());
    } finally {
      dispatch(setSelectButton('chat'));
    }
  }
);
export const setReadAllNotice = createAsyncThunk(
  'chat/setReadAllNotice',
  async (_, { getState }) => {
    await axios.post(API, {
      metrage_id: metrage_id || null,
      method: 'crm.notifications.readedAll',
      fields: {
        userId: getState().user.UID,
      },
    });
  }
);
export const setReadNotice = createAsyncThunk(
  'chat/setReadNotice',
  async (notice) => {
    const res = await axios.post(API, {
      metrage_id: metrage_id || null,
      method: 'crm.notifications.readed',
      fields: {
        UID: notice.UID,
      },
    });
    if (res?.statusText === 'OK') {
      const { data } = res;
      if (data?.result?.result === 'OK') {
        return notice;
      }
    }
  }
);
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
      },
    });
    if (res?.statusText === 'OK') {
      dispatch(setLastMesssage(res.data.result));
      return res.data.result;
    }
  }
);
export const forwardOpenLineChat = createAsyncThunk(
  'chat/forwardChat',
  async (userId, { getState, dispatch }) => {
    const res = await axios.post(API, {
      metrage_id: metrage_id || null,
      method: 'crm.messages.setOwner',
      fields: {
        userId: userId,
        chatId: getState().chat.currentChat.chatId,
      },
    });
    if (res?.statusText === 'OK') {
      dispatch(getChatList());
    }
  }
);
export const closeOpenLineChat = createAsyncThunk(
  'chat/closeOpenLineChat',
  async (_, { getState, dispatch }) => {
    const res = await axios.post(API, {
      metrage_id: metrage_id || null,
      method: 'crm.messages.closeChat',
      fields: {
        chatId: getState().chat.currentChat.chatId,
      },
    });
    if (res?.statusText === 'OK') {
      dispatch(getChatList());
    }
  }
);

const initialState = {
  loadingMore: false,
  buttonMore: false,
  messageCounter: counter,
  show: false,
  selectButton: 'notification',
  notification: [],
  chatList: [],
  currentChat: null,
  chatLoading: false,
  targetAuthor: null,
  offset: 0,
};

const userSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    toggleShowChat(state) {
      state.show = !state.show;
      state.currentChat = null;
      state.targetAuthor = null;
      state.selectButton = 'notification';
    },
    setSelectButton(state, action) {
      const newSelectButton = action.payload;
      state.selectButton = newSelectButton;
      if (newSelectButton === 'notification') {
        state.offset = 0;
      }
    },
    setCounterMessage(state, action) {
      state.messageCounter = action.payload;
    },
    clearCurrentChat(state, action) {
      state.targetAuthor = null;
      state.currentChat = null;
    },
    setTargetAuthor(state, action) {
      state.targetAuthor = action.payload;
    },
    setLastMesssage(state, action) {
      const message = action.payload;
      const findChat = state.chatList.chats.find(
        (chat) =>
          chat?.chatWith?.UID.toString() === state.targetAuthor.UID.toString()
      );
      findChat.lastMessage = message;
      state.chatList.chats.splice(
        state.chatList.chats.indexOf(findChat),
        1,
        findChat
      );
    },
    addMessage(state, action) {
      const newMessage = action.payload;
      if (state.currentChat && state.currentChat.chatId === newMessage.chatId) {
        state.currentChat.messages = [
          ...state.currentChat.messages,
          newMessage.messages,
        ];
        return;
      }
      const findChat = state.chatList.chats.find(
        (chat) => chat.chatId === newMessage.chatId
      );
      if (findChat) {
        findChat.unread++;
        state.messageCounter++;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNotification.fulfilled, (state, action) => {
        state.notification = action.payload;
      })
      .addCase(getChatList.fulfilled, (state, action) => {
        state.chatList = action.payload || null;
        if (action.payload.chats.length === 30) {
          state.buttonMore = true;
        }
      })
      .addCase(getListSearch.fulfilled, (state, action) => {
        state.chatList = action.payload || null;
        state.buttonMore = false;
      })
      .addCase(getChatListMore.pending, (state, action) => {
        state.loadingMore = true;
      })
      .addCase(getChatListMore.fulfilled, (state, action) => {
        const newChatList = action.payload;
        state.chatList.chats = [...state.chatList.chats, ...newChatList.chats];
        state.chatList.unreadOpenLinesCount = newChatList.unreadOpenLinesCount;
        state.loadingMore = false;
        state.offset = state.offset + 1;
        if (newChatList.chats.length < 30) {
          state.buttonMore = false;
        }
      })
      .addCase(getCurrentChat.pending, (state, action) => {
        state.chatLoading = true;
      })
      .addCase(getCurrentChat.fulfilled, (state, action) => {
        const currentChat = action.payload;
        state.currentChat = currentChat || null;
        state.chatLoading = false;
        const findChat = state.chatList.chats.find(
          (item) => item.chatId === currentChat.chatId
        );
        if (findChat) {
          const countUnread = findChat.unread;
          findChat.unread = 0;
          state.chatList.unreadCount = state.chatList.unreadCount - countUnread;
          state.messageCounter = state.messageCounter - countUnread;
        }
      })
      .addCase(getCurrentChat.rejected, (state, action) => {
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
          messages: [],
        };
      })
      .addCase(setReadNotice.fulfilled, (state, action) => {
        const notice = action.payload;
        const noticeList = state.notification.notifications;
        const findNotice = noticeList.find((item) => item.UID === notice.UID);
        findNotice.readed = true;
        state.notification.notifyUnread = state.notification.notifyUnread - 1;
        state.messageCounter--;
      })
      .addCase(setReadAllNotice.fulfilled, (state) => {
        state.notification.notifications = state.notification.notifications.map(
          (notice) => {
            if (notice.readed) {
              return notice;
            }
            return { ...notice, readed: true };
          }
        );
        state.messageCounter =
          state.messageCounter - state.notification.notifyUnread;
        state.notification.notifyUnread = 0;
      })
      .addCase(closeOpenLineChat.pending, (state) => {
        state.chatLoading = true;
      })
      .addCase(closeOpenLineChat.fulfilled, (state) => {
        state.chatLoading = false;
      })
      .addCase(closeOpenLineChat.rejected, (state) => {
        state.chatLoading = false;
      })
      .addCase(forwardOpenLineChat.pending, (state) => {
        state.chatLoading = true;
      })
      .addCase(forwardOpenLineChat.fulfilled, (state) => {
        state.chatLoading = false;
      })
      .addCase(forwardOpenLineChat.rejected, (state) => {
        state.chatLoading = false;
      });
  },
});

export const {
  toggleShowChat,
  setSelectButton,
  setTargetAuthor,
  setLastMesssage,
  clearCurrentChat,
  setCounterMessage,
} = userSlice.actions;
export default userSlice.reducer;
