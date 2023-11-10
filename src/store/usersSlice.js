import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const API = process.env.MAIN_API;

export const getUsersList = createAsyncThunk(
  'users/getUsersList',
  async (filterForm, { getState, dispatch }) => {
    const curFilter = filterForm ? filterForm : getState().users.filter;
    const res = await axios.post(API, {
      metrage_id: metrage_id || null,
      method: 'crm.users.filter',
      fields: { ...curFilter },
    });
    if (filterForm) {
      dispatch(setNewFilter(filterForm));
    }
    if (res?.statusText === 'OK') {
      return res?.data?.result || [];
    }
    return [];
  }
);
export const getSliceUserMiniCard = createAsyncThunk(
  'users/getSliceUserMiniCard',
  async (UID) => {
    const res = await axios.post(API, {
      metrage_id: metrage_id || null,
      method: 'crm.users.filter',
      fields: { UID: UID },
    });

    if (res?.statusText === 'OK') {
      return res?.data?.result || {};
    }
    return {};
  }
);
export const addNewMiniCard = createAsyncThunk(
  'users/addNewMiniCard',
  async (UID) => {
    const res = await axios.post(API, {
      metrage_id: metrage_id || null,
      method: 'crm.users.filter',
      fields: { UID: UID },
    });

    if (res?.statusText === 'OK') {
      return res?.data?.result || {};
    }
    return {};
  }
);
export const defaultUsersFilter = {
  office: '',
  fired: false,
};
const getFilter = () => {
  const filter = localStorage.getItem('filterUsers');
  if (filter) {
    return JSON.parse(filter);
  }
  return defaultUsersFilter;
};

const initialState = {
  users: [],
  loadingList: true,
  filter: getFilter(),
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearUsers(state, action) {
      state.users = [];
    },
    setNewFilter(state, action) {
      state.filter = action.payload;
    },
    resetFilter(state) {
      state.filter = defaultDealFilter;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsersList.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loadingList = false;
      })
      .addCase(getSliceUserMiniCard.fulfilled, (state, action) => {
        const curUser = action.payload;
        const findUser = state.users.find((user) => user.UID === curUser.UID);
        if (!findUser) {
          return;
        }
        if (JSON.stringify(curUser) === JSON.stringify(findUser)) {
          return;
        }
        state.users.splice(state.users.indexOf(findUser), 1, curUser);
      })
      .addCase(addNewMiniCard.fulfilled, (state, action) => {
        state.users = [action.payload, ...state.users];
      });
  },
});

export const { resetFilter, setNewFilter, clearUsers } = usersSlice.actions;
export default usersSlice.reducer;
