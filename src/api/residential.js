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
