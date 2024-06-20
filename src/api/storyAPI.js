import axios from 'axios';
const API = 'https://crm.metragegroup.com/API/REST.php';

export const sendHistoryMessage = async (method, appId, message) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.history.sendMessage',
    fields: {
      type: method,
      UID: appId,
      ...message,
    },
  });
  if (res?.statusText === 'OK') {
    return res?.data?.result;
  }
};

export const getHistoryList = async (id, type) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.history.list',
    fields: {
      UID: id,
      type: type,
    },
  });
  if (res?.statusText === 'OK') {
    return res?.data?.result || [];
  }
};
export const getHistoryList2 = async (id, type) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.history.listv2',
    fields: {
      UID: id,
      type: type,
    },
  });
  if (res?.statusText === 'OK') {
    return res?.data?.result || [];
  }
};
export const setIsPinned = async (raw) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.history.pinHistory',
    fields: raw,
  });
  if (res?.statusText === 'OK') {
    return 'OK';
  }
};
