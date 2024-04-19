import axios from 'axios';
const API = process.env.MAIN_API;

export const getOneMortage = async (id) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.mortgage.get',
    fields: {
      UID: id,
    },
  });
  if (res?.statusText === 'OK') {
    return res?.data?.result || {};
  }
  return {};
};
export const createNewMortage = async (raw) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.mortgage.add',
    fields: raw,
  });
  if (res?.statusText === 'OK') {
    return res?.data?.result?.UID || null;
  }
  return null;
};
