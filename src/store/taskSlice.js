import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getHistoryList, sendHistoryMessage } from "api/storyAPI";
const API = 'https://crm.metragegroup.com/API/REST.php';
export const getTaskList = createAsyncThunk(
  'task/getTaskList',
  async (firstUpdate) => {
    const res = await axios.post(API, {
      metrage_id: metrage_id || null,
      method: "crm.demand.list"
    })
    return res
  }
)
export const setNewTask = createAsyncThunk(
  'task/setNewTask',
  async (form, { dispatch }) => {
    const res = await axios.post(API, {
      metrage_id: metrage_id || null,
      method: "crm.demand.add",
      fields: form
    })
    if (res?.data?.result?.status === 'OK') {
      dispatch(getTaskList());
      dispatch(toggleNewTask());
    }
    return res
  }
)
export const getTask = createAsyncThunk(
  'task/getTask',
  async (uid) => {
    const res = await axios.post(API, {
      metrage_id: metrage_id || null,
      method: "crm.demand.get",
      fields: {
        UID: uid
      }
    })
    return res
  }
)
export const getTaskStory = createAsyncThunk(
  'task/getTaskStory',
  (uid) => {
    return getHistoryList('demands', uid);
    // const res = await axios.post(API, {
    //   metrage_id: metrage_id || null,
    //   method: 'crm.history.list',
    //   fields: {
    //     UID: uid,
    //     type: "demands"
    //   }
    // })
    // return res
  }
)
export const sendTaskMessage = createAsyncThunk(
  'task/sendTaskMessage',
  (raw) => {
    return sendHistoryMessage('demands', raw.uid, raw.message);
  }
)
export const changeAgent = createAsyncThunk(
  'task/changeAgent',
  async (raw, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.post(API, {
        metrage_id: metrage_id || null,
        method: 'crm.demand.setOwner',
        fields: {
          UID: raw.UID,
          responsibleId: raw.responsibleId,
          interaction: raw?.interaction
        }
      })
      if (data?.result?.status === 'OK') {
        dispatch(getTaskList());
        dispatch(clearTask());
        return data.result.status;
      }
      // return res;
    } catch (err) {
      // return rejectWithValue(err);
    }
  }
)
export const changeStage = createAsyncThunk(
  'task/changeStage',
  async (raw) => {
    const res = await axios.post(API, {
      metrage_id: metrage_id || null,
      method: 'crm.demand.setStage',
      fields: {
        stageId: raw.stage,
        UID: raw.UID,
        comment: raw.comment
      }
    })
  }
)
export const setNewContact = createAsyncThunk(
  'task/setNewContact',
  async (form, { rejectWithValue, getState, dispatch }) => {
    try {
      const res = await axios.post(API, {
        metrage_id: metrage_id || null,
        method: 'crm.demand.show',
        fields: {
          UID: getState().task.openTask.UID,
          ...form
        }
      })
      if (res?.statusText !== 'OK') {
        throw new Error ('Server error');
      }
      if (getState().task?.openTask) {
        dispatch(setCurrentNewContact(form));
      }
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
export const changeType = createAsyncThunk(
  'task/changeType',
  async (raw, { rejectWithValue }) => {
    try {
      const res = await axios.post(API, {
        metrage_id: metrage_id || null,
        method: 'crm.demand.setType',
        fields: {
          UID: raw.uid,
          ...raw.form
        }
      })
      return res
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
const initialState = {
  loading: false,
  loadingTask: false,
  loadingNewTask: false,
  taskList: [],
  openTask: null,
  taskStory: [],
  isShowNewTask: false,
  view: 'tile',
  filterTypeList: 'all',
};


const taskSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    clearTask(state) {
      state.openTask = null;
    },
    toggleNewTask(state) {
      state.isShowNewTask = !state.isShowNewTask;
    },
    toggleLoadingNewTask(state) {
      state.loadingNewTask = !state.loadingNewTask;
    },
    setTasksView(state, action) {
      const newView = action.payload;
      state.view = newView;
    },
    setFilterTypeTaskList(state, action) {
      const newFilterTypeList = action.payload;
      state.filterTypeList = newFilterTypeList;
    },
    setCurrentNewContact(state, action) {
      state.openTask.demand.nextContact = action.payload.nextDate;
      state.openTask.demand.comment = action.payload.comment;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTaskList.pending, (state, action) => {
        if (action.meta.arg) {
          state.loading = true;
        }
      })
      .addCase(getTaskList.fulfilled, (state, action) => {
        const { data } = action.payload;
        if (data && data?.result) {
          const serverTaskList = data?.result?.transwerData || [];
          if (state.taskList !== serverTaskList) {
            state.taskList = serverTaskList;
          }
        }
        state.loading = false;
      })
      .addCase(getTaskList.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getTask.pending, (state) => {
        state.loadingTask = true;
      })
      .addCase(getTask.fulfilled, (state, action) => {
        const { data } = action.payload;
        if (data && data?.result) {
          const serverTask = data?.result?.transwerData?.length > 0 ? data?.result?.transwerData[0] : null;
          if (state.openTask !== serverTask) {
            state.openTask = serverTask;
          }
        }
        state.loadingTask = false;
      })
      .addCase(getTask.rejected, (state) => {
        state.loadingTask = false;
      })
      .addCase(getTaskStory.fulfilled, (state, action) => {
        const payload = action.payload;
        if (payload.status === 200 && payload.statusText === 'OK') {
          state.taskStory = payload?.data?.result || [];
        }
      })
      .addCase(sendTaskMessage.fulfilled, (state, action) => {
        const payload = action.payload;
        if (payload.status === 200 && payload.statusText === 'OK') {
          const newMessage = payload?.data?.result || null;
          if (newMessage) {
            state.taskStory = [...state.taskStory, newMessage];
          }
        }
      })
      .addCase(setNewTask.pending, (state, action) => {
        state.loadingNewTask = true;
      })
      .addCase(setNewTask.fulfilled, (state, action) => {
        const { data } = action.payload;
        if (data?.result?.status === 'OK') {
          console.log('new task reading to server');
        }
        state.loadingNewTask = false;
      })
      .addCase(setNewTask.rejected, (state) => {
        state.loadingNewTask = false;
      })
  }
})
export const { clearTask, toggleNewTask, setTasksView, setFilterTypeTaskList, setCurrentNewContact, toggleLoadingNewTask } = taskSlice.actions;
export default taskSlice.reducer;