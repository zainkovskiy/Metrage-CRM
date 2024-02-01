import axios from 'axios';
const API = process.env.MAIN_API;

export const getSlideResidential = async (id) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.jk.get',
    fields: {
      UID: id,
    },
  });
  if (res?.statusText === 'OK') {
    return res?.data?.result || {};
  }
  return {};
};
export const createNewResidential = async (raw) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.jk.add',
    fields: raw,
  });
  if (res?.statusText === 'OK') {
    return res?.data?.result || null;
  }
  return null;
};
export const updateResidential = async (raw) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.jk.update',
    fields: raw,
  });
  if (res?.statusText === 'OK') {
    return 'OK';
  }
  return 'No OK';
};
export const createNewManagerResidential = async (raw) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.jk.addManager',
    fields: raw,
  });
  if (res?.statusText === 'OK') {
    return res?.data?.result || null;
  }
  return null;
};
export const editManagerResidential = async (raw) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.jk.updateManager',
    fields: raw,
  });
  if (res?.statusText === 'OK') {
    return 'OK';
  }
  return 'No OK';
};
export const removeManagerResidential = async (raw) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.jk.delManager',
    fields: raw,
  });
  if (res?.statusText === 'OK') {
    return 'OK';
  }
  return 'No OK';
};
export const addNewPhotoResidential = async (raw) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.jk.addPhoto',
    fields: raw,
  });
  if (res?.statusText === 'OK') {
    return res?.data?.result || null;
  }
  return null;
};
export const removePhotoResidential = async (raw) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.jk.delPhoto',
    fields: raw,
  });
  if (res?.statusText === 'OK') {
    return 'OK';
  }
  return 'No OK';
};
