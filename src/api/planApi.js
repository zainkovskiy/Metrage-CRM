import axios from 'axios';
const API = 'https://crm.metragegroup.com/API/REST.php';

export const getOnePlan = async (id) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.plans.get',
    fields: {
      UID: id,
    },
  });
  if (res?.statusText === 'OK') {
    return res?.data?.result || {};
  }
  return {};
};

export const createPlan = async (raw) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.plans.create',
    fields: raw,
  });
  //FIXME ломается
  if (res?.statusText === 'OK') {
    return res?.data?.result || {};
  }
  return {};
};

export const setChiefAccepted = async (UID) => {
  await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.plans.setChiefAccepted',
    fields: {
      UID: UID,
    },
  });
};
export const setChiefDisAccepted = async (UID) => {
  await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.plans.setChiefDisAccepted',
    fields: {
      UID: UID,
    },
  });
};
export const setManagerAccepted = async (UID) => {
  await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.plans.setManagerAccepted',
    fields: {
      UID: UID,
    },
  });
};
export const setManagerDisAccepted = async (UID) => {
  await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.plans.setManagerDisAccepted',
    fields: {
      UID: UID,
    },
  });
};

export const setNewOffice = async (raw) => {
  await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.plans.updateOffice',
    fields: raw,
  });
};
export const setNewPlanDate = async (raw) => {
  await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.plans.updateDate',
    fields: raw,
  });
};
