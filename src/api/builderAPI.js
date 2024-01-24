import axios from 'axios';
const API = 'https://crm.metragegroup.com/API/REST.php';

export const getOneBuilder = async (id) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.developers.get',
    fields: {
      UID: id,
    },
  });
  if (res?.statusText === 'OK') {
    return res?.data?.result || {};
  }
  return {};
};
