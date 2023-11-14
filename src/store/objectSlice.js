import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API = process.env.MAIN_API;
const user = globalUser ? JSON.parse(globalUser) : null;

export const createObject = createAsyncThunk(
  'objects/createObject',
  async (object, { dispatch }) => {
    const res = await axios.post(API, {
      metrage_id: metrage_id || null,
      method:
        object?.typeEstate === 'commercial'
          ? 'crm.objects.addBusiness'
          : 'crm.objects.add',
      fields: object,
    });
    if (res?.statusText === 'OK') {
      // dispatch(getObjectList('create'));
      return {
        status: res?.data?.result?.result,
        url: res?.data?.result?.URL || null,
      };
    }
  }
);
export const getObjectList = createAsyncThunk(
  'objects/getObjectList',
  async (chartFilter, { getState }) => {
    const getCurrentFilter = () => {
      if (chartFilter) {
        return chartFilter;
      }
      return getState().objects.filter;
    };
    const res = await axios.post(API, {
      metrage_id: metrage_id || null,
      method: 'crm.objects.filter',
      fields: {
        ...getCurrentFilter(),
        offset: 0,
      },
    });
    if (res?.statusText === 'OK') {
      return res?.data?.result || {};
    }
    return {};
  }
);
export const getMoreObjects = createAsyncThunk(
  'objects/getMoreObjects',
  async (_, { getState }) => {
    const res = await axios.post(API, {
      metrage_id: metrage_id || null,
      method: 'crm.objects.filter',
      fields: {
        ...getState().objects.filter,
        offset: getState().objects.offset + 1,
      },
    });
    if (res?.statusText === 'OK') {
      return res?.data?.result?.objects || [];
    }
    return [];
  }
);
export const changeObjectResponsible = createAsyncThunk(
  'objects/changeObjectResponsible',
  async (raw) => {
    const res = await axios.post(API, {
      metrage_id: metrage_id || null,
      method: 'crm.objects.setOwner',
      fields: {
        UID: raw.UID,
        type: raw.type,
        responsibleId: raw.responsibleId,
      },
    });
    if (res?.statusText === 'OK') {
      return res.statusText;
    }
  }
);
export const changeObjectStage = createAsyncThunk(
  'objects/changeObjectStage',
  async (raw) => {
    await axios.post(API, {
      metrage_id: metrage_id || null,
      method: 'crm.objects.setStage',
      fields: {
        StageId: raw.stage,
        UID: raw.UID,
        type: raw.type,
      },
    });
  }
);
export const getObjectOneMiniCard = createAsyncThunk(
  'objects/getObjectOneMiniCard',
  async (raw) => {
    const res = await axios.post(API, {
      metrage_id: metrage_id || null,
      method: 'crm.objects.filter',
      fields: raw,
    });
    if (res?.statusText === 'OK') {
      return res?.data?.result?.objects || {};
    }
    return {};
  }
);
const getFilter = () => {
  const filter = localStorage.getItem('filterObject');
  if (filter) {
    return JSON.parse(filter);
  }
  return {
    typeRealty: 'live',
    stage: 1,
    users: [user],
    onAdv: 'pofig',
    ExternalFindType: 'our',
  };
};
const initialState = {
  loadingList: true,
  loadingMore: false,
  objects: [],
  objectItems: 0,
  basket: [],
  filter: getFilter(),
  offset: 1,
  viewCard: 'cell',
};

const objectSlice = createSlice({
  name: 'objects',
  initialState,
  reducers: {
    setFilter(state, action) {
      state.filter = action.payload;
      state.offset = 0;
    },
    addToBasket(state, action) {
      const object = action.payload;
      const find = state.basket.find((item) => item.UID === object.UID);
      if (find) {
        return;
      }
      state.basket = [...state.basket, object];
    },
    removeFromBasket(state, action) {
      const object = action.payload;
      const find = state.basket.find((item) => item.UID === object.UID);
      if (find) {
        state.basket.splice(state.basket.indexOf(find), 1);
      }
    },
    clearBasket(state, action) {
      state.basket = [];
    },
    clearObjects(state, action) {
      state.objects = [];
      state.objectItems = 0;
      state.offset = 0;
      state.loadingList = true;
    },
    setViewCard(state, action) {
      state.viewCard = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // .addCase(getObjectList.pending, (state, action) => {
      //   // const source = action.meta.arg;
      //   // if (source) {
      //   //   return;
      //   // }
      //   // state.loadingList = true;
      // })
      .addCase(getObjectList.fulfilled, (state, action) => {
        state.loadingList = false;
        state.objects = action.payload?.objects || [];
        state.objectItems = action.payload?.items || 0;
        state.offset = 0;
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
      .addCase(getObjectOneMiniCard.fulfilled, (state, action) => {
        const curObject = action.payload;
        const findObject = state.objects.find(
          (object) => object.UID === curObject.UID
        );
        if (!findObject) {
          return;
        }
        if (JSON.stringify(curObject) === JSON.stringify(findObject)) {
          return;
        }
        state.objects.splice(state.objects.indexOf(findObject), 1, curObject);
      });
  },
});
export const {
  clearObjects,
  setFilter,
  addToBasket,
  removeFromBasket,
  clearBasket,
  setViewCard,
} = objectSlice.actions;
export default objectSlice.reducer;
