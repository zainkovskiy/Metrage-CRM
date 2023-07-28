import axios from "axios";
const API = 'https://crm.metragegroup.com/API/REST.php';

export const getSpecialityTypes = async (category) => {
  console.log(category);
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: "crm.objects.getSpecialityTypes",
    fields: {
      category: category
    }
  })
  if (res?.statusText === 'OK') {
    console.log(res);
    return res?.data?.result || []
  }
  return []
}
export const getBusinessBuildingTypes = async () => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: "crm.objects.getBusinessBuildingTypes",
  })
  if (res?.statusText === 'OK') {
    return res?.data?.result || []
  }
  return []
}
export const getBusinessСenters = async (value) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: "crm.objects.getBusinessСenters",
    fields: {
      request: value
    }
  })
  if (res?.statusText === 'OK') {
    return res?.data?.result || []
  }
  return []
}
export const createNewObject = async (object) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: object?.typeEstate === 'commercial' ? "crm.objects.addBusiness" : "crm.objects.add",
    fields: object,
  })
  if (res?.statusText === 'OK') {
    console.log(res);
  }
}
export const getOneObject = async (id) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: "crm.objects.get",
    fields: {
      UID: id
    }
  })
  if (res?.statusText === 'OK') {
    return res?.data?.result || {}
  }
  return {}
}
