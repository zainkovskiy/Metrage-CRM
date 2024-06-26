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
import clientsSlice from './clientsSlice';
import dashboardSlice from './dashboardSlice';
import usersSlice from './usersSlice';
import taskSlice from './taskSlice';
import newsSlice from './slices/newsSlice';
import plansSlice from './slices/plansSlice';
import builderSlice from './slices/builderSlice';
import residentialSlice from './slices/residentialSlice';
import noticeSlice from './slices/noticeSlice';
import calendarSlice from './slices/calendarSlice';
import mortageSlice from './slices/mortageSlice';
import ddsSlice from './slices/ddsSlice';
import fixationSlice from './slices/fixationSlice';

const reducers = combineReducers({
  user: userSlice,
  photo: photoSlice,
  chat: chatSlice,
  telegram: telegramSlice,
  application: applicationSlice,
  objects: objectSlice,
  deal: dealSlice,
  compilation: compilationSlice,
  clients: clientsSlice,
  dashboard: dashboardSlice,
  users: usersSlice,
  task: taskSlice,
  news: newsSlice,
  plans: plansSlice,
  builder: builderSlice,
  residential: residentialSlice,
  notice: noticeSlice,
  calendar: calendarSlice,
  mortage: mortageSlice,
  dds: ddsSlice,
  fixation: fixationSlice,
});

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      socketMiddleware()
    ),
});
