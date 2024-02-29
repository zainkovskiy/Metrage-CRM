import axios from 'axios';
const API = process.env.MAIN_API;

export const getEventList = async () => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.calendar.get',
    // fields: raw,
  });
  if (res?.statusText === 'OK') {
    return res?.data?.result || {};
  }
  return {};
};
