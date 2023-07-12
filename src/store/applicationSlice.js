import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = 'https://crm.metragegroup.com/API/REST.php';

export const getApplicationList = createAsyncThunk(
  'task/getApplicationList',
  async (_, { dispatch, getState }) => {
    const res = await axios.post(API, {
      metrage_id: metrage_id || null,
      method: "crm.demand.list",
    })
    if (res?.statusText === 'OK') {
      return res?.data?.result?.transwerData || []
    }
    return []
  }
)
export const getMoreApplication = createAsyncThunk(
  'task/getMoreApplication',
  async (_, { dispatch, getState }) => {
    const res = await axios.post(API, {
      metrage_id: metrage_id || null,
      method: "crm.demand.list",
      fields: {
        offset: getState().application.offset + 1, 
      }
    })
    if (res?.statusText === 'OK') {
      return res?.data?.result?.transwerData || []
    }
    return []
  }
)
export const setNewApplication = createAsyncThunk(
  'task/setNewApplication',
  async (form, { dispatch }) => {
    const res = await axios.post(API, {
      metrage_id: metrage_id || null,
      method: "crm.demand.add",
      fields: form
    })
    if (res?.statusText === 'OK') {
      return res
    }
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
  async (data, { rejectWithValue, getState, dispatch }) => {
    try {
      const res = await axios.post(API, {
        metrage_id: metrage_id || null,
        method: 'crm.demand.show',
        fields: {
          UID: data.UID,
          ...data.form
        }
      })
      if (res?.statusText !== 'OK') {
        throw new Error('Server error');
      }
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
export const checkApplication = createAsyncThunk(
  'task/updateContact',
  async (raw, { rejectWithValue }) => {
    try {
      const res = await axios.post(API, {
        metrage_id: metrage_id || null,
        method: 'crm.demand.checked',
        fields: raw,
      })
      return res
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
export const updateContact = createAsyncThunk(
  'task/updateContact',
  async (raw, { rejectWithValue }) => {
    try {
      const res = await axios.post(API, {
        metrage_id: metrage_id || null,
        method: 'crm.contact.update',
        fields: {
          UID: raw.UID,
          fields: raw.form
        }
      })
      return res
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
  loadingList: false,
  loadingMore: false,
  applications: [],
  offset: 0,
  loadingNewApplication: false,
  view: 'tile',
  filterTypeList: 'all',
};


const applicationSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setApplicationView(state, action) {
      const newView = action.payload;
      state.view = newView;
    },
    setFilterTypeApplicationList(state, action) {
      const newFilterTypeList = action.payload;
      state.filterTypeList = newFilterTypeList;
    },
    clearApplication(state, action){
     state.applications = [];
     state.offset = 0;
    }, 
    editApplication(state, action){
      // const app = action.payload;
      // const find = state.applications.find((item) => item.UID === app.UID);
      // const parsFind = JSON.parse(JSON.stringify(find));
      // console.log(JSON.stringify(parsFind) === JSON.stringify(app));
      // console.log(app);
      // console.log(parsFind);
    }, 
  },
  extraReducers: (builder) => {
    builder
      .addCase(getApplicationList.pending, (state) => {
        state.loadingList = true;
      })
      .addCase(getApplicationList.fulfilled, (state, action) => {
        state.loadingList = false;
        state.applications = action.payload;
      })
      .addCase(getApplicationList.rejected, (state) => {
        state.loadingList = false;
      })
      .addCase(getMoreApplication.pending, (state, action) => {
        state.loadingMore = true;
      })
      .addCase(getMoreApplication.fulfilled, (state, action) => {
        state.offset++;
        state.applications = [...state.applications, ...action.payload];
        state.loadingMore = false;
      })
      .addCase(getMoreApplication.rejected, (state, action) => {
        state.loadingMore = false;
      })
      .addCase(setNewApplication.pending, (state, action) => {
        state.loadingNewApplication = true;
      })
      .addCase(setNewApplication.fulfilled, (state, action) => {
        const { data } = action.payload;
        if (data?.result?.status === 'OK') {
          console.log('new task reading to server');
        }
        state.loadingNewApplication = false;
      })
      .addCase(setNewApplication.rejected, (state) => {
        state.loadingNewApplication = false;
      })
  }
})
export const { setApplicationView, setFilterTypeApplicationList, clearApplication, editApplication } = applicationSlice.actions;
export default applicationSlice.reducer;