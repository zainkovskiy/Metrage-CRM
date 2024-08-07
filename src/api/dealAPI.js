import axios from 'axios';
const API = 'https://crm.metragegroup.com/API/REST.php';

export const getNewBuilderList = async (raw) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.deal.getNewborn',
    fields: raw,
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
    return res?.data?.result;
  }
  return { result: 'No OK' };
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

export const addContactSide = async (raw) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.deal.clientsAdd',
    fields: raw,
  });
  if (res?.statusText === 'OK') {
    return 'OK';
  }
  return 'No OK';
};
export const removeContactSide = async (raw) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.deal.clientsDel',
    fields: raw,
  });
  if (res?.statusText === 'OK') {
    return 'OK';
  }
  return 'No OK';
};
export const updateDeal = async (raw) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.deal.update',
    fields: raw,
  });
  if (res?.statusText === 'OK') {
    return 'OK';
  }
  return 'No OK';
};
export const setDealStage = async (raw) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.deal.setStage',
    fields: raw,
  });
  if (res?.statusText === 'OK') {
    return 'OK';
  }
  return 'No OK';
};
export const getDds = async (uid) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.deal.getDds',
    fields: {
      UID: uid,
    },
  });
  if (res?.statusText === 'OK') {
    return res?.data?.result || [];
  }
  return [];
};
export const calculationAgent = async (raw) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.deal.specialPay',
    fields: raw,
  });
  if (res?.statusText === 'OK') {
    return 'OK';
  }
  return 'No Ok';
};
export const removeDDSLine = async (UID) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.deal.deleteDds',
    fields: {
      UID: UID,
    },
  });
  if (res?.statusText === 'OK') {
    return 'OK';
  }
  return 'No Ok';
};
export const getCalculation = async (raw) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.deal.getCalculation',
    fields: raw,
  });
  if (res?.statusText === 'OK') {
    return res?.data?.result || null;
  }
  return null;
};
export const setCalculationAuto = async (raw) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.deal.setCalculationAuto',
    fields: raw,
  });
  if (res?.statusText === 'OK') {
    return 'OK';
  }
  return 'No Ok';
};
export const setCalculationManual = async (raw) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.deal.setCalculationManual',
    fields: raw,
  });
  if (res?.statusText === 'OK') {
    return 'OK';
  }
  return 'No Ok';
};
export const attachToDDS = async (raw) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.deal.attachToDDS',
    fields: raw,
  });
  if (res?.statusText === 'OK') {
    return 'OK';
  }
  return 'No Ok';
};
