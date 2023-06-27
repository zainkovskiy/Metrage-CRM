import axios from "axios";
const API = 'https://crm.metragegroup.com/API/REST.php';

export const getDetailForNewApp = async (chatId) => {
  const res = await axios.post('https://crm.metragegroup.com/API/REST.php', {
    metrage_id: metrage_id,
    method: 'crm.messages.getDetails',
    fields: {
      chatId: chatId
    }
  })
  if (res?.statusText === 'OK') {
    return res?.data?.result
  }
}

export const getApplicationData = async (appId) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: "crm.demand.get",
    fields: {
      UID: appId
    }
  })
  if (res?.statusText === 'OK') {
    return res?.data?.result?.transwerData?.length > 0 ? res?.data?.result?.transwerData[0] : null;
  }
}
export const getApplicationHistory = async (appId) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.history.list',
    fields: {
      UID: appId,
      type: "demands"
    }
  })
  if (res?.statusText === 'OK') {
    return res?.data?.result || [];
  }
}