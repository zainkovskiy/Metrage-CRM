import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import userSlice from './userSlice';
import chatSlice from './chatSlice';
import telegramSlice from './telegramSlice';
import applicationSlice from './applicationSlice';
import objectSlice from './objectSlice';
import dealSlice from './dealSlice';
import { socketMiddleware } from './socket';
import compilationSlice from './compilationSlice';
import photoSlice from './photoSlice';

const reducers = combineReducers({
  user: userSlice,
  photo: photoSlice,
  chat: chatSlice,
  telegram: telegramSlice,
  application: applicationSlice,
  objects: objectSlice,
  deal: dealSlice,
  compilation: compilationSlice,
});

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      socketMiddleware()
    ),
});
