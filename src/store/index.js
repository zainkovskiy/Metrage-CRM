import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import chatSlice from "./chatSlice";
import telegramSlice from "./telegramSlice";
import applicationSlice from "./applicationSlice";
import objectSlice from "./objectSlice";
import { socketMiddleware } from "./socket";

const reducers = combineReducers({
  user: userSlice,
  chat: chatSlice,
  telegram: telegramSlice, 
  application: applicationSlice,
  objects: objectSlice,
})

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}).concat(socketMiddleware())
})
