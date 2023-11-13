import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API = process.env.MAIN_API;
const user = globalUser ? JSON.parse(globalUser) : null;

export const getApplicationList = createAsyncThunk(
  'application/getApplicationList',
  async (_, { dispatch, getState }) => {
    const res = await axios.post(API, {
      metrage_id: metrage_id || null,
      method: 'crm.demand.filter',
    });
    if (res?.statusText === 'OK') {
      return res?.data?.result?.transwerData || [];
    }
    return [];
  }
);
export const getApplicationFilterList = createAsyncThunk(
  'application/getApplicationFilterList',
  async (raw, { dispatch, getState }) => {
    try {
      const res = await axios
        .post(API, {
          metrage_id: metrage_id || null,
          method: 'crm.demand.filter',
          fields: raw || getState().application.filter,
        })
        .catch((err) => {
          throw new Error(
            `${err?.response?.status}, ${err?.response?.data?.reason}`
          );
        });
      if (res?.statusText === 'OK') {
        return res?.data?.result?.transwerData || [];
      }
    } catch (error) {
      console.log(error);
      return [];
    } finally {
      if (raw) {
        dispatch(setApplicationFilter(raw));
      }
    }
  }
);
export const getMoreApplication = createAsyncThunk(
  'application/getMoreApplication',
  async (_, { dispatch, getState }) => {
    const res = await axios.post(API, {
      metrage_id: metrage_id || null,
      method: 'crm.demand.filter',
      fields: {
        offset: getState().application.offset + 1,
      },
    });
    if (res?.statusText === 'OK') {
      return res?.data?.result?.transwerData || [];
    }
    return [];
  }
);
export const setNewApplication = createAsyncThunk(
  'application/setNewApplication',
  async (form, { dispatch }) => {
    const res = await axios.post(API, {
      metrage_id: metrage_id || null,
      method: 'crm.demand.add',
      fields: form,
    });
    if (res?.statusText === 'OK') {
      dispatch(setUpdateApplication(res?.data?.result?.UID));
      return res;
    }
  }
);
export const changeAgent = createAsyncThunk(
  'application/changeAgent',
  async (raw, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.post(API, {
        metrage_id: metrage_id || null,
        method: 'crm.demand.setOwner',
        fields: {
          UID: raw.UID,
          responsibleId: raw.responsibleId,
          interaction: raw?.interaction,
        },
      });
      if (data?.result?.status === 'OK') {
        return data.result.status;
      }
      // return res;
    } catch (err) {
      // return rejectWithValue(err);
    }
  }
);
export const changeStage = createAsyncThunk(
  'application/changeStage',
  async (raw) => {
    const res = await axios.post(API, {
      metrage_id: metrage_id || null,
      method: 'crm.demand.setStage',
      fields: raw,
    });
  }
);
export const setNewContact = createAsyncThunk(
  'application/setNewContact',
  async (data, { rejectWithValue, getState, dispatch }) => {
    try {
      const res = await axios.post(API, {
        metrage_id: metrage_id || null,
        method: 'crm.demand.show',
        fields: {
          UID: data.UID,
          ...data.form,
        },
      });
      if (res?.statusText !== 'OK') {
        throw new Error('Server error');
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const checkApplication = createAsyncThunk(
  'application/updateContact',
  async (raw, { rejectWithValue }) => {
    try {
      const res = await axios.post(API, {
        metrage_id: metrage_id || null,
        method: 'crm.demand.checked',
        fields: raw,
      });
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const updateContact = createAsyncThunk(
  'application/updateContact',
  async (raw, { rejectWithValue }) => {
    try {
      const res = await axios.post(API, {
        metrage_id: metrage_id || null,
        method: 'crm.contact.update',
        fields: {
          UID: raw.UID,
          fields: raw.form,
        },
      });
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const changeType = createAsyncThunk(
  'application/changeType',
  async (raw, { rejectWithValue }) => {
    try {
      const res = await axios.post(API, {
        metrage_id: metrage_id || null,
        method: 'crm.demand.setType',
        fields: {
          UID: raw.uid,
          ...raw.form,
        },
      });
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const setUpdateApplication = createAsyncThunk(
  'application/setUpdateApplication',
  async (UID) => {
    const res = await axios.post(API, {
      metrage_id: metrage_id || null,
      method: 'crm.demand.listOne',
      fields: {
        UID: UID,
      },
    });
    if (res?.statusText === 'OK') {
      return res?.data?.result?.transwerData?.length > 0
        ? res?.data?.result?.transwerData[0]
        : null;
    }
  }
);

export const defaultAppFilter = {
  users: [user],
  status: 'all',
  type: 'all',
  isFailure: false,
  isWork: true,
  office: '',
};

const getFilter = () => {
  const filter = localStorage.getItem('filterApplication');
  if (filter) {
    return JSON.parse(filter);
  }
  return defaultAppFilter;
};
const initialState = {
  loadingList: false,
  loadingMore: false,
  applications: [],
  offset: 0,
  loadingNewApplication: false,
  filter: getFilter(),
};

const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    clearApplication(state, action) {
      state.applications = [];
      state.offset = 0;
    },
    setApplicationFilter(state, action) {
      state.filter = action.payload;
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
      .addCase(setUpdateApplication.fulfilled, (state, action) => {
        const app = action.payload;
        if (!app) {
          return;
        }
        const find = state.applications.find((item) => item.UID === app.UID);
        if (!find) {
          state.applications = [app, ...state.applications];
          return;
        }
        if (JSON.stringify(app) === JSON.stringify(find)) {
          return;
        }
        state.applications.splice(state.applications.indexOf(find), 1, app);
      })
      .addCase(getApplicationFilterList.pending, (state) => {
        state.loadingList = true;
        state.offset = 0;
      })
      .addCase(getApplicationFilterList.fulfilled, (state, action) => {
        state.loadingList = false;
        state.applications = action.payload;
      })
      .addCase(getApplicationFilterList.rejected, (state) => {
        state.loadingList = false;
      });
  },
});
export const { clearApplication, setApplicationFilter } =
  applicationSlice.actions;
export default applicationSlice.reducer;
