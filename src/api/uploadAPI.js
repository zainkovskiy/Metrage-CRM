import axios from 'axios';
const API = process.env.API;

export const uploadFiles = async (files, UID) => {
  const data = new FormData();
  for (let file of files) {
    data.append('files[]', file);
  }
  data.append('UID', UID);
  const res = await axios.post(
    'https://crm.metragegroup.com/API/Upload.php',
    data
  );
  if (res?.statusText === 'OK') {
    return res?.data || [];
  }
  return [];
};
