import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API = process.env.MAIN_API;

export const getPhotoList = createAsyncThunk(
  'photo/getPhotoList',
  async (raw) => {
    const res = await axios.post(API, {
      metrage_id: metrage_id || null,
      method: 'crm.objects.getPhoto',
      fields: raw,
    });
    if (res?.statusText === 'OK') {
      return res?.data?.result || [];
    }
    return [];
  }
);
export const saveChangeList = createAsyncThunk(
  'photo/saveChangeList',
  async (raw) => {
    const res = await axios.post(API, {
      metrage_id: metrage_id || null,
      method: 'crm.objects.finishPhoto',
      fields: raw,
    });
    if (res?.statusText === 'OK') {
      return 'OK';
    }
    return 'No OK';
  }
);
export const getEditPhoto = createAsyncThunk(
  'photo/getEditPhoto',
  async (raw, { dispatch }) => {
    const res = await axios.post(API, {
      metrage_id: metrage_id || null,
      method: 'crm.photoeditor.getPhotoForEdit',
      fields: raw,
    });
    if (res.statusText === 'OK') {
      dispatch(setTargetUID(raw.UID));
      return res?.data?.result || {};
    }
    return {};
  }
);
export const turnPhoto = createAsyncThunk('photo/turnPhoto', async (raw) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.photoeditor.Turn',
    fields: raw,
  });
  if (res.statusText === 'OK') {
    return res?.data?.result || {};
  }
  return {};
});
export const changeBrightnessPhoto = createAsyncThunk(
  'photo/changeBrightnessPhoto',
  async (raw) => {
    const res = await axios.post(API, {
      metrage_id: metrage_id || null,
      method: 'crm.photoeditor.brightness',
      fields: raw,
    });
    if (res.statusText === 'OK') {
      return res?.data?.result || {};
    }
    return {};
  }
);
export const saveChangeTargetPhoto = createAsyncThunk(
  'photo/saveChangeTargetPhoto',
  async (uid) => {
    const res = await axios.post(API, {
      metrage_id: metrage_id || null,
      method: 'crm.photoeditor.set',
      fields: {
        UID: uid,
      },
    });
    if (res.statusText === 'OK') {
      return res?.data?.result || {};
    }
    return {};
  }
);
export const cropPhoto = createAsyncThunk('photo/cropPhoto', async (raw) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.photoeditor.Crop',
    fields: raw,
  });
  if (res.statusText === 'OK') {
    return res?.data?.result || {};
  }
  return {};
});
export const removeStampPhoto = createAsyncThunk(
  'photo/removeStampPhoto',
  async (raw) => {
    const res = await axios.post(API, {
      metrage_id: metrage_id || null,
      method: 'crm.photoeditor.clear',
      fields: raw,
    });
    if (res.statusText === 'OK') {
      return res?.data?.result || {};
    }
    return {};
  }
);

const initialState = {
  photos: [],
  photosOrigin: [],
  loading: true,
  targetPhoto: null,
  targetUID: null,
};

const photoSlice = createSlice({
  name: 'photo',
  initialState,
  reducers: {
    clearPhotos(state, action) {
      state.photos = [];
      state.photosOrigin = [];
      state.loading = true;
      state.targetPhoto = null;
      state.targetUID = null;
    },
    removePhoto(state, action) {
      const photo = action.payload;
      console.log(action);
      console.log(state.photos);
      state.photos = state.photos.filter((item) => item.UID !== photo.UID);
    },
    setWeb(state, action) {
      const photo = action.payload;
      state.photos = state.photos.map((item) => {
        if (item.UID === photo.UID) {
          item.isWeb = !item.isWeb;
          return item;
        }
        return item;
      });
    },
    setWebAllPhotos(state, action) {
      state.photos = state.photos.map((item) => {
        item.isWeb = !item.isWeb;
        return item;
      });
    },
    setType(state, action) {
      const photo = action.payload.photo;
      const newType = action.payload.type;
      state.photos = state.photos.map((item) => {
        if (item.UID === photo.UID) {
          item.type = newType;
          return item;
        }
        return item;
      });
    },
    setTargetUID(state, action) {
      state.targetUID = action.payload;
    },
    clearTargetPhoto(state, action) {
      state.targetPhoto = null;
      state.targetUID = null;
    },
    swapPhoto(state, action) {
      const photos = JSON.parse(JSON.stringify(state.photos));
      const dragStart = photos.find(
        (item) => item.UID === action.payload.dragStart.UID
      );
      const dragEnd = photos.find(
        (item) => item.UID === action.payload.dragEnd.UID
      );
      photos.splice(
        photos.indexOf(dragEnd),
        0,
        ...photos.splice(photos.indexOf(dragStart), 1)
      );
      state.photos = photos;
    },
    uploadPhotos(state, action) {
      state.photos = [...state.photos, ...action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPhotoList.fulfilled, (state, action) => {
        state.photos = action.payload;
        state.photosOrigin = action.payload;
        state.loading = false;
      })
      .addCase(saveChangeList.pending, (state) => {
        state.loading = true;
      })
      .addCase(saveChangeList.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(getEditPhoto.fulfilled, (state, action) => {
        state.targetPhoto = action.payload;
      })
      .addCase(turnPhoto.fulfilled, (state, action) => {
        state.targetPhoto = action.payload;
      })
      .addCase(changeBrightnessPhoto.fulfilled, (state, action) => {
        state.targetPhoto = action.payload;
      })
      .addCase(removeStampPhoto.fulfilled, (state, action) => {
        state.targetPhoto = action.payload;
      })
      .addCase(cropPhoto.fulfilled, (state, action) => {
        state.targetPhoto = action.payload;
      })
      .addCase(saveChangeTargetPhoto.pending, (state, action) => {
        state.loading = true;
        state.targetPhoto = null;
      })
      .addCase(saveChangeTargetPhoto.fulfilled, (state, action) => {
        const find = state.photos.find((item) => item.UID === state.targetUID);
        if (find) {
          state.photos.splice(state.photos.indexOf(find), 1, action.payload);
        }
        state.targetUID = null;
        state.loading = false;
      });
  },
});
export const {
  clearPhotos,
  removePhoto,
  setWeb,
  setType,
  setTargetPhoto,
  clearTargetPhoto,
  setWebAllPhotos,
  swapPhoto,
  uploadPhotos,
  setTargetUID,
} = photoSlice.actions;
export default photoSlice.reducer;
