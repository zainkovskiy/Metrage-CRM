import axios from 'axios';
const API = process.env.MAIN_API;

export const getSlideResidential = async (id) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.objects.getResidential',
    fields: {
      // UID: id,
    },
  });
  if (res?.statusText === 'OK') {
    return res?.data?.result || {};
  }
  return {};
};
