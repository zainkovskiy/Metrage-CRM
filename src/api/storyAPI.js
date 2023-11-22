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
