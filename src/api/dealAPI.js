import axios from 'axios';
const API = 'https://crm.metragegroup.com/API/REST.php';

export const getNewBuilderList = async (value) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.deal.getNewborn',
    fields: {
      request: value,
    },
  });
  if (res?.statusText === 'OK') {
    return res?.data?.result || [];
  }
  return [];
};
export const getBidList = async (value) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.deal.getBids',
    fields: {
      request: value,
    },
  });
  if (res?.statusText === 'OK') {
    return res?.data?.result || [];
  }
  return [];
};
export const getObjectList = async (value, realtyType) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.deal.getObjects',
    fields: {
      request: value,
      realtyType: realtyType,
    },
  });
  if (res?.statusText === 'OK') {
    return res?.data?.result || [];
  }
  return [];
};
export const createDeal = async (form) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.deal.create',
    fields: {
      ...form,
    },
  });
  if (res?.statusText === 'OK') {
    console.log(res);
    return 'OK';
  }
  return 'No OK';
};
export const getOneDeal = async (id) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.deal.get',
    fields: {
      UID: id,
    },
  });
  if (res?.statusText === 'OK') {
    return res?.data?.result || {};
  }
  return {};
};
export const addUserSide = async (raw, type) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: type === 'realtors' ? 'crm.deal.realtorAdd' : 'crm.deal.lawyerAdd',
    fields: raw,
  });
  if (res?.statusText === 'OK') {
    return 'OK';
  }
  return 'No OK';
};

export const removeUserSide = async (raw) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.deal.killUser',
    fields: raw,
  });
  if (res?.statusText === 'OK') {
    return 'OK';
  }
  return 'No OK';
};
export const setNewComission = async (raw) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.deal.updateComission',
    fields: raw,
  });
  if (res?.statusText === 'OK') {
    return 'OK';
  }
  return 'No OK';
};
