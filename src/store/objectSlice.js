import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = process.env.MAIN_API;

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
  }
})
export const { clearObjects, setFilter } = objectSlice.actions;
export default objectSlice.reducer;