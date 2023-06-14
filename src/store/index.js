import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import chatSlice from "./chatSlice";
import telegramSlice from "./telegramSlice";
import taskSlice from "./taskSlice";

const reducers = combineReducers({
  user: userSlice,
  chat: chatSlice,
  telegram: telegramSlice, 
  task: taskSlice,
})

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
})
