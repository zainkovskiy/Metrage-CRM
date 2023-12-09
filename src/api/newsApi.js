import axios from 'axios';
const API = process.env.MAIN_API;

export const getOneNews = async (id) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.news.get',
    fields: {
      UID: id,
    },
  });
  if (res?.statusText === 'OK') {
    return res?.data?.result || {};
  }
  return {};
};
export const createNews = async (raw) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.news.add',
    fields: raw,
  });
  if (res?.statusText === 'OK') {
    return res?.data?.result?.UID || '';
  }
  return {};
};
export const updateNews = async (raw) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.news.update',
    fields: raw,
  });
  if (res?.statusText === 'OK') {
    return 'OK';
  }
  return 'No OK';
};
