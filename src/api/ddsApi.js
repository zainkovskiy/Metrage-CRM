import axios from 'axios';
const API = process.env.MAIN_API;

export const getDefaultDDS = async () => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.dds.getDefault',
  });
  if (res?.statusText === 'OK') {
    return res?.data?.result || {};
  }
  return {};
};
export const getDefaultDDS2 = async () => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.dds.getDefault2',
  });
  if (res?.statusText === 'OK') {
    return res?.data?.result || {};
  }
  return {};
};
export const getSlidetDDS = async (id) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.dds.getById',
    fields: {
      UID: id,
    },
  });
  if (res?.statusText === 'OK') {
    return res?.data?.result || {};
  }
  return {};
};
export const setIsDelete = async (id) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.dds.delete',
    fields: {
      UID: id,
    },
  });
  if (res?.statusText === 'OK') {
    return res?.data?.result || {};
  }
  return {};
};
export const getSubCategory = async (category) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.dds.listSubCat',
    fields: {
      request: category,
    },
  });
  if (res?.statusText === 'OK') {
    return res?.data?.result || [];
  }
  return [];
};
export const dealOperational = async (UID) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.dds.dealOperational',
    fields: {
      UID: UID,
    },
  });
  if (res?.statusText === 'OK') {
    return res?.data?.result || null;
  }
  return null;
};
