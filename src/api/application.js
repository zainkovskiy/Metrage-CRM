import axios from 'axios';
const API = 'https://crm.metragegroup.com/API/REST.php';

export const getApplicationsList = async () => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.demand.list',
  });
  if (res?.statusText === 'OK') {
    return res?.data?.result?.transwerData || [];
  }
  return [];
};

export const getDetailForNewApp = async (chatId) => {
  const res = await axios.post('https://crm.metragegroup.com/API/REST.php', {
    metrage_id: metrage_id,
    method: 'crm.messages.getDetails',
    fields: {
      chatId: chatId,
    },
  });
  if (res?.statusText === 'OK') {
    return res?.data?.result;
  }
};

export const getApplicationData = async (appId) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.demand.get',
    fields: {
      UID: appId,
    },
  });
  if (res?.statusText === 'OK') {
    return res?.data?.result?.transwerData?.length > 0
      ? res?.data?.result?.transwerData[0]
      : null;
  }
};

export const getApplicationHistory = async (appId) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.history.list',
    fields: {
      UID: appId,
      type: 'demands',
    },
  });
  if (res?.statusText === 'OK') {
    return res?.data?.result || [];
  }
};

export const newCompilation = async (demandId, objects) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.compilation.addRoster',
    fields: {
      demandId: demandId,
      objects: objects,
    },
  });
  if (res.statusText === 'OK') {
    return res?.data?.result?.roster;
  }
};

export const addToCompilation = async (demandId, compilationUid, objects) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.compilation.addRosterItems',
    fields: {
      UID: compilationUid,
      demandId: demandId,
      objects: objects,
    },
  });
  if (res.statusText === 'OK') {
    return res?.data?.result?.roster;
  }
};

export const getObjectsConnectList = async (value, type) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.demand.getObjectsForConnect',
    fields: {
      request: value,
      type: type,
    },
  });
  if (res?.statusText === 'OK') {
    return res?.data?.result || [];
  }
  return [];
};
export const setObjectsConnect = async (raw) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.demand.connectObject',
    fields: raw,
  });
  if (res?.statusText === 'OK') {
    return res?.data?.result || {};
  }
  return {};
};
export const setDisConnectObject = async (UID) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.demand.disconnectObject',
    fields: {
      UID: UID,
    },
  });
  if (res?.statusText === 'OK') {
    return 'OK';
  }
  return 'No OK';
};

export const setSelectFlag = async (raw) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.demand.setFlag',
    fields: raw,
  });
  if (res?.statusText === 'OK') {
    return 'OK';
  }
  return 'No OK';
};
