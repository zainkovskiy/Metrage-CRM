import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = 'https://crm.metragegroup.com/API/REST.php';

export const getObjectList = createAsyncThunk(
  'objects/getObjectList',
  async (_, { getState }) => {
    const res = await axios.post(API, {
      metrage_id: metrage_id || null,
      method: "crm.objects.filter",
      fields: {
        ...getState().objects.filter,
        offset: getState().objects.offset,
      }
    })
    if (res?.statusText === 'OK') {
      return res?.data?.result?.objects || []
    }
    return []
  }
)
export const getMoreObjects = createAsyncThunk(
  'objects/getMoreObjects',
  async (_, { getState }) => {
    const res = await axios.post(API, {
      metrage_id: metrage_id || null,
      method: "crm.objects.filter",
      fields: {
        ...getState().objects.filter,
        offset: getState().objects.offset + 1,
      }
    })
    if (res?.statusText === 'OK') {
      return res?.data?.result?.objects || []
    }
    return []
  }
)
// export const setNewApplication = createAsyncThunk(
//   'application/setNewApplication',
//   async (form, { dispatch }) => {
//     const res = await axios.post(API, {
//       metrage_id: metrage_id || null,
//       method: "crm.demand.add",
//       fields: form
//     })
//     if (res?.statusText === 'OK') {
//       dispatch(setUpdateApplication(res?.data?.result?.UID));
//       return res
//     }
//   }
// )
// export const changeAgent = createAsyncThunk(
//   'application/changeAgent',
//   async (raw, { dispatch, rejectWithValue }) => {
//     try {
//       const { data } = await axios.post(API, {
//         metrage_id: metrage_id || null,
//         method: 'crm.demand.setOwner',
//         fields: {
//           UID: raw.UID,
//           responsibleId: raw.responsibleId,
//           interaction: raw?.interaction
//         }
//       })
//       if (data?.result?.status === 'OK') {
//         return data.result.status;
//       }
//       // return res;
//     } catch (err) {
//       // return rejectWithValue(err);
//     }
//   }
// )
// export const changeStage = createAsyncThunk(
//   'application/changeStage',
//   async (raw) => {
//     const res = await axios.post(API, {
//       metrage_id: metrage_id || null,
//       method: 'crm.demand.setStage',
//       fields: {
//         stageId: raw.stage,
//         UID: raw.UID,
//         comment: raw.comment
//       }
//     })
//   }
// )
// export const setNewContact = createAsyncThunk(
//   'application/setNewContact',
//   async (data, { rejectWithValue, getState, dispatch }) => {
//     try {
//       const res = await axios.post(API, {
//         metrage_id: metrage_id || null,
//         method: 'crm.demand.show',
//         fields: {
//           UID: data.UID,
//           ...data.form
//         }
//       })
//       if (res?.statusText !== 'OK') {
//         throw new Error('Server error');
//       }
//     } catch (error) {
//       return rejectWithValue(error)
//     }
//   }
// )
// export const checkApplication = createAsyncThunk(
//   'application/updateContact',
//   async (raw, { rejectWithValue }) => {
//     try {
//       const res = await axios.post(API, {
//         metrage_id: metrage_id || null,
//         method: 'crm.demand.checked',
//         fields: raw,
//       })
//       return res
//     } catch (error) {
//       return rejectWithValue(error)
//     }
//   }
// )
// export const updateContact = createAsyncThunk(
//   'application/updateContact',
//   async (raw, { rejectWithValue }) => {
//     try {
//       const res = await axios.post(API, {
//         metrage_id: metrage_id || null,
//         method: 'crm.contact.update',
//         fields: {
//           UID: raw.UID,
//           fields: raw.form
//         }
//       })
//       return res
//     } catch (error) {
//       return rejectWithValue(error)
//     }
//   }
// )
// export const changeType = createAsyncThunk(
//   'application/changeType',
//   async (raw, { rejectWithValue }) => {
//     try {
//       const res = await axios.post(API, {
//         metrage_id: metrage_id || null,
//         method: 'crm.demand.setType',
//         fields: {
//           UID: raw.uid,
//           ...raw.form
//         }
//       })
//       return res
//     } catch (error) {
//       return rejectWithValue(error)
//     }
//   }
// )
// export const setUpdateApplication = createAsyncThunk(
//   'application/setUpdateApplication',
//   async (UID) => {
//     const res = await axios.post(API, {
//       metrage_id: metrage_id || null,
//       method: 'crm.demand.listOne',
//       fields: {
//         UID: UID,
//       }
//     })
//     if (res?.statusText === 'OK') {
//       return res?.data?.result?.transwerData?.length > 0 ? res?.data?.result?.transwerData[0] : null;
//     }
//   }
// )
const initialState = {
  loadingList: false,
  loadingMore: false,
  objects: [],
  filter: {
    typeRealty: 'live',
    typeObject: ['flatSale'],
    users: [],
    office: []
  },
  offset: 0,
};


const objectSlice = createSlice({
  name: 'objects',
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
    setFilter(state, action) {
      state.filter[action.payload.name] = action.payload.value;
      state.offset = 0;
      if (action.payload.name === 'typeRealty') {
        state.filter.typeObject = [];
      }
    },
    clearObjects(state, action) {
      state.objects = [];
      state.offset = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getObjectList.pending, (state) => {
        state.loadingList = true;
      })
      .addCase(getObjectList.fulfilled, (state, action) => {
        state.loadingList = false;
        state.objects = action.payload;
      })
      .addCase(getObjectList.rejected, (state) => {
        state.loadingList = false;
      })
      .addCase(getMoreObjects.pending, (state, action) => {
        state.loadingMore = true;
      })
      .addCase(getMoreObjects.fulfilled, (state, action) => {
        state.offset++;
        state.objects = [...state.objects, ...action.payload];
        state.loadingMore = false;
      })
      .addCase(getMoreObjects.rejected, (state, action) => {
        state.loadingMore = false;
      })
    // .addCase(setNewApplication.pending, (state, action) => {
    //   state.loadingNewApplication = true;
    // })
    // .addCase(setNewApplication.fulfilled, (state, action) => {
    //   const { data } = action.payload;
    //   if (data?.result?.status === 'OK') {
    //     console.log('new task reading to server');
    //   }
    //   state.loadingNewApplication = false;
    // })
    // .addCase(setNewApplication.rejected, (state) => {
    //   state.loadingNewApplication = false;
    // })
    // .addCase(setUpdateApplication.fulfilled, (state, action) => {
    //   const app = action.payload;
    //   if (!app) { return }
    //   const find = state.applications.find((item) => item.UID === app.UID);
    //   if (!find) {
    //     state.applications = [app, ...state.applications];
    //     return
    //   }
    //   if (JSON.stringify(app) === JSON.stringify(find)) { return }
    //   state.applications.splice(state.applications.indexOf(find), 1, app);
    // })
  }
})
export const { clearObjects, setFilter } = objectSlice.actions;
export default objectSlice.reducer;