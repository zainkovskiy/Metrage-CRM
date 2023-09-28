import axios from 'axios';
const API = process.env.MAIN_API;

export const getOneCompilation = async (id) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.compilation.getRoster',
    fields: {
      UID: id,
    },
  });
  if (res?.statusText === 'OK') {
    return res?.data?.result || {};
  }
  return {};
};
export const getCompilationSimpleList = async (id) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.compilation.listLite',
  });
  if (res?.statusText === 'OK') {
    return res?.data?.result || [];
  }
  return {};
};
