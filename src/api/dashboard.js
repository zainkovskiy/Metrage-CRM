import axios from 'axios';
const API = process.env.MAIN_API;

export const getDashboardModeData = async () => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.dashboard2.getModeForm',
  });
  if (res?.statusText === 'OK') {
    return res?.data?.result || {};
  }
  return {};
};
export const getDashboardUsers = async (value) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.dashboard2.getUsers',
    fields: {
      request: value,
    },
  });
  if (res?.statusText === 'OK') {
    return res?.data?.result || [];
  }
  return [];
};
