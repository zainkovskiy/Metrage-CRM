import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = 'https://crm.metragegroup.com/API/REST.php';

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
  },
  extraReducers: (builder) => {
    builder
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
export const { setApplicationView, setFilterTypeApplicationList } = applicationSlice.actions;
export default applicationSlice.reducer;