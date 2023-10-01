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
export const getCompilationSimpleList = async () => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.compilation.listLite',
  });
  if (res?.statusText === 'OK') {
    return res?.data?.result || [];
  }
  return {};
};
export const setNewComment = async (id, comment) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.compilation.updPresentationDescription',
    fields: {
      UID: id,
      comment: comment,
    },
  });
  if (res?.statusText === 'OK') {
    return 'OK';
  }
  return 'No OK';
};
