import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const API = process.env.MAIN_API;

export const getTaskList = createAsyncThunk(
  'task/getUsersList',
  async (filterForm, { getState, dispatch }) => {
    const curFilter = filterForm ? filterForm : getState().task.filter;
    const res = await axios.post(API, {
      metrage_id: metrage_id || null,
      method: 'crm.task.filter',
      // fields: { ...curFilter },
    });
    // if (filterForm) {
    //   dispatch(setNewFilter(filterForm));
    // }
    if (res?.statusText === 'OK') {
      return res?.data?.result || null;
    }
    return null;
  }
);
export const setReadAll = createAsyncThunk('task/setReadAll', async () => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.task.setReadedAll',
  });
  if (res?.statusText === 'OK') {
    return 'OK';
  }
});
export const updateTaskCard = createAsyncThunk(
  'users/updateTaskCard',
  async (UID) => {
    const res = await axios.post(API, {
      metrage_id: metrage_id || null,
      method: 'crm.task.getOne',
      fields: { UID: UID },
    });

    if (res?.statusText === 'OK') {
      return res?.data?.result || {};
    }
    return {};
  }
);
export const defaultTaskFilter = {};
const getFilter = () => {
  const filter = localStorage.getItem('filterTask');
  if (filter) {
    return JSON.parse(filter);
  }
  return defaultTaskFilter;
};

const initialState = {
  taskData: null,
  loadingList: true,
  filter: getFilter(),
};

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    clearTasks(state, action) {
      state.taskData = null;
    },
    setNewFilter(state, action) {
      state.filter = action.payload;
    },
    resetFilter(state) {
      state.filter = defaultTaskFilter;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTaskList.fulfilled, (state, action) => {
      state.taskData = action.payload;
      state.loadingList = false;
    });
    builder.addCase(getTaskList.rejected, (state, action) => {
      state.loadingList = false;
    });
    builder.addCase(setReadAll.fulfilled, (state, action) => {
      state.taskData.tasks = state.taskData.tasks.map((task) => {
        return { ...task, notify: 0 };
      });
    });
    builder.addCase(updateTaskCard.fulfilled, (state, action) => {
      const curTask = action.payload;
      const findTask = state.taskData.tasks.find(
        (task) => task.UID === curTask.UID
      );
      if (!findTask) {
        return;
      }
      if (JSON.stringify(curTask) === JSON.stringify(findTask)) {
        return;
      }
      state.taskData.tasks.splice(
        state.taskData.tasks.indexOf(findTask),
        1,
        curTask
      );
    });
  },
});

export const { resetFilter, setNewFilter, clearTasks } = taskSlice.actions;
export default taskSlice.reducer;