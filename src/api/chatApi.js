import axios from 'axios';
const API = process.env.MAIN_API;

export const getAutoForm = async (uid) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.notifications.getAutoForm',
    fields: {
      UID: uid,
    },
  });
  if (res?.statusText === 'OK') {
    return res?.data?.result || null;
  }
  return null;
};
export const setAutoForm = async (raw) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.notifications.setAutoForm',
    fields: raw,
  });
  if (res?.statusText === 'OK') {
    return 'OK';
  }
  return 'No OK';
};
