import axios from 'axios';
const API = process.env.MAIN_API;

export const getOneUser = async (id) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.users.getById',
    fields: {
      UID: id,
    },
  });
  if (res?.statusText === 'OK') {
    return res?.data?.result || {};
  }
  return {};
};
export const getPassword = async (id) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.users.getPassword',
    fields: {
      UID: id,
    },
  });
  if (res?.statusText === 'OK') {
    return res?.data?.result || {};
  }
  return {};
};
export const saveNewPassword = async (id, newPass) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.users.setPassword',
    fields: {
      UID: id,
      pass: newPass,
    },
  });
  if (res?.statusText === 'OK') {
    return 'OK';
  }
  return 'No OK';
};
export const setNewUserValue = async (values) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.users.modify',
    fields: values,
  });
  if (res?.statusText === 'OK') {
    return 'OK';
  }
  return 'No OK';
};
export const getPositionList = async () => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.users.getPositions',
  });
  if (res?.statusText === 'OK') {
    return res?.data?.result || [];
  }
  return [];
};
export const addNewPhone = async (newPhone) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.users.AddPhone',
    fields: newPhone,
  });
  if (res?.statusText === 'OK') {
    return res?.data?.result || {};
  }
  return {};
};
export const removePhone = async (newPhone) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.users.DeletePhone',
    fields: newPhone,
  });
  if (res?.statusText === 'OK') {
    return 'OK';
  }
  return 'No OK';
};
export const updatePhone = async (editPhone) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.users.UpdatePhone',
    fields: editPhone,
  });
  if (res?.statusText === 'OK') {
    return 'OK';
  }
  return 'No OK';
};
export const createNewUser = async (form) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.users.create',
    fields: {
      ...form,
    },
  });
  if (res?.statusText === 'OK') {
    return res?.data?.result;
  }
  return { result: 'No OK' };
};
export const changeActiveStage = async (UID) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.users.ChangeActiveState',
    fields: {
      UID: UID,
    },
  });
  if (res?.statusText === 'OK') {
    return 'OK';
  }
  return 'No OK';
};
export const updateAvatar = async (raw) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.users.setAvatar',
    fields: raw,
  });
  if (res?.statusText === 'OK') {
    return 'OK';
  }
  return 'No OK';
};
export const removeAvatar = async (UID) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.users.delAvatar',
    fields: {
      UID: UID,
    },
  });
  if (res?.statusText === 'OK') {
    return 'OK';
  }
  return 'No OK';
};
