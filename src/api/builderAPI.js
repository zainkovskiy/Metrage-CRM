import axios from 'axios';
const API = process.env.MAIN_API;

export const getOneBuilder = async (id) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.developers.get',
    fields: {
      UID: id,
    },
  });
  if (res?.statusText === 'OK') {
    return res?.data?.result || {};
  }
  return {};
};

export const createNewBuilder = async (form) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.developers.add',
    fields: {
      ...form,
    },
  });
  if (res?.statusText === 'OK') {
    return res?.data?.result || null;
  }
  return null;
};
export const setNewLogo = async (raw) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.developers.setLogo',
    fields: raw,
  });
  if (res?.statusText === 'OK') {
    return 'OK';
  }
  return 'No OK';
};
export const setNewComment = async (raw) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.developers.setDescription',
    fields: raw,
  });
  if (res?.statusText === 'OK') {
    return 'OK';
  }
  return 'No OK';
};
export const setNewValueDeveloper = async (raw) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.developers.setNameDateAndType',
    fields: raw,
  });
  if (res?.statusText === 'OK') {
    return 'OK';
  }
  return 'No OK';
};
export const setNewManager = async (raw) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.developers.addManager',
    fields: raw,
  });
  if (res?.statusText === 'OK') {
    return res?.data?.result || null;
  }
  return null;
};
export const updateManager = async (raw) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.developers.updateManager',
    fields: raw,
  });
  if (res?.statusText === 'OK') {
    return res?.data?.result || null;
  }
  return null;
};
export const removeManager = async (raw) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.developers.delManager',
    fields: raw,
  });
  if (res?.statusText === 'OK') {
    return 'OK';
  }
  return 'No OK';
};
