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