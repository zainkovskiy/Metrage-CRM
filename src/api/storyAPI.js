import axios from "axios"
const API = 'https://crm.metragegroup.com/API/REST.php';

export const getHistoryList = async (method, uid) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.history.list',
    fields: {
      UID: uid,
      type: method
    }
  })
  return res;
}

export const sendHistoryMessage = async (method, uid, message) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.history.sendMessage',
    fields: {
      UID: uid,
      type: method,
      message: message
    }
  })
  return res;
}