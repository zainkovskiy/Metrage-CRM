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
export const getOneObject = async (id, category, forUpdate) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: category === 'business' ? 'crm.objects.getBusiness' : 'crm.objects.get',
    fields: {
      UID: id,
      forUpdate: forUpdate,
    }
  })
  if (res?.statusText === 'OK') {
    return res?.data?.result || {}
  }
  return {}
}
export const getPublication = async (id, estate) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.objects.getPublication',
    fields: {
      UID: id,
      type: estate,
    }
  })
  if (res?.statusText === 'OK') {
    return res?.data?.result || {}
  }
  return {}
}
export const setPublication = async (id, estate, date) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.objects.setPublication',
    fields: {
      UID: id,
      type: estate,
      date: date,
    }
  })
  if (res?.statusText === 'OK') {
    return 'OK'
  }
  return "NO OK"
}
export const getPhotoListAPI = async (UID, estate) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.objects.getPhoto',
    fields: {
      UID: UID,
      type: estate,
    }
  })
  if (res?.statusText === 'OK') {
    return res?.data?.result || []
  }
  return []
}
export const setChangePhotoListAPI = async (UID, estate, newArr) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.objects.finishPhoto',
    fields: {
      UID: UID,
      type: estate,
      photos: newArr
    }
  })
  if (res?.statusText === 'OK') {
    return 'OK'
  }
  return ''
}
