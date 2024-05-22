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
export const setNewChild = async (raw) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.mortgage.addChild',
    fields: raw,
  });
  if (res?.statusText === 'OK') {
    return res?.data?.result || null;
  }
  return null;
};
export const updateChild = async (raw) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.mortgage.updateChild',
    fields: raw,
  });
  if (res?.statusText === 'OK') {
    return 'OK';
  }
  return 'No OK';
};
export const removeChild = async (raw) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.mortgage.deleteChild',
    fields: raw,
  });
  if (res?.statusText === 'OK') {
    return 'OK';
  }
  return 'No OK';
};
export const removeMortgageFile = async (uid) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.mortgage.deleteFiles',
    fields: {
      UID: uid,
    },
  });
  if (res?.statusText === 'OK') {
    return 'OK';
  }
  return 'No OK';
};
export const setConsultation = async (value) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.mortgage.setConsultation',
    fields: {
      mode: value,
    },
  });
  if (res?.statusText === 'OK') {
    return 'OK';
  }
  return 'No OK';
};
