import axios from 'axios';
const API = process.env.MAIN_API;

export const checkedPhone = async (phone) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.clientfixation.checkPhone',
    fields: {
      phone: phone,
    },
  });
  if (res?.statusText === 'OK') {
    return res?.data?.result || {};
  }
  return {};
};

export const getSlideFixation = async (id) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.clientfixation.get',
    fields: {
      UID: id,
    },
  });
  if (res?.statusText === 'OK') {
    return res?.data?.result || {};
  }
  return {};
};
