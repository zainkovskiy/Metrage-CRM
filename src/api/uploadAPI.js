import axios from 'axios';
const API = process.env.MAIN_API;

export const uploadFiles = async (files, raw) => {
  const data = new FormData();
  for (let file of files) {
    data.append('files[]', file);
  }
  for (let key in raw) {
    data.append(key, raw[key]);
  }
  const res = await axios.post(
    'https://crm.metragegroup.com/API/Upload.php',
    data
  );
  if (res?.statusText === 'OK') {
    return res?.data || [];
  }
  return [];
};
export const removeFile = async (UID) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.deal.attachDelete',
    fields: {
      UID: UID,
    },
  });
  if (res?.statusText === 'OK') {
    return 'OK';
  }
  return 'No Ok';
};
