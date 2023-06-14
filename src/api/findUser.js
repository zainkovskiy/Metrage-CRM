import axios from "axios";
const API = 'https://crm.metragegroup.com/API/REST.php';

export const getFindList = async (value) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.users.find',
    fields: {
      request: value,
    }
  })
  return res;
}
export const getOfficeList = async (value) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.demand.getInterGroups',
  })
  return res;
}