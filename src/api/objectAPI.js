import axios from 'axios';
const API = 'https://crm.metragegroup.com/API/REST.php';

export const getSpecialityTypes = async (category) => {
  console.log(category);
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.objects.getSpecialityTypes',
    fields: {
      category: category,
    },
  });
  if (res?.statusText === 'OK') {
    console.log(res);
    return res?.data?.result || [];
  }
  return [];
};
export const getBusinessBuildingTypes = async () => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.objects.getBusinessBuildingTypes',
  });
  if (res?.statusText === 'OK') {
    return res?.data?.result || [];
  }
  return [];
};
export const getBusinessСenters = async (value) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.objects.getBusinessСenters',
    fields: {
      request: value,
    },
  });
  if (res?.statusText === 'OK') {
    return res?.data?.result || [];
  }
  return [];
};
export const getOneObject = async (id, category, forUpdate) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method:
      category === 'business' || category === 'businessExternal'
        ? 'crm.objects.getBusiness'
        : 'crm.objects.get',
    fields: {
      UID: id,
      CategoryOriginal: category,
      forUpdate: forUpdate,
    },
  });
  if (res?.statusText === 'OK') {
    return res?.data?.result || {};
  }
  return {};
};
export const getPublication = async (raw) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.objects.getAdvertising',
    fields: raw,
  });
  if (res?.statusText === 'OK') {
    return res?.data?.result || {};
  }
  return {};
};
export const setPublication = async (raw) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.objects.setAdvertising',
    fields: raw,
  });
  if (res?.status === 200) {
    return;
  }
  if (res?.status === 201) {
    return res?.data?.result;
  }
  return { result: 'error', message: 'Ошибка' };
};
export const setAdAccepted = async (raw) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.objects.setAccepted',
    fields: raw,
  });
  if (res?.status === 200) {
    return;
  }
  if (res?.status === 201) {
    return res?.data?.result;
  }
  return { result: 'error', message: 'Ошибка' };
};
export const setAdDeclined = async (raw) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.objects.setDeclined',
    fields: raw,
  });
  if (res?.statusText === 'OK') {
    return res?.data?.result;
  }
  return { result: 'error', message: 'Ошибка' };
};
export const uploadPhoto = async (files, UID) => {
  const data = new FormData();
  for (let file of files) {
    data.append('images[]', file);
  }
  data.append('UID', UID);
  const res = await axios.post(
    'https://crm.metragegroup.com/API/PhotoUpload.php',
    data
  );
  if (res?.statusText === 'OK') {
    return res?.data || [];
  }
  return [];
  // const xhr = new XMLHttpRequest();
  // xhr.open('POST', 'https://crm.metragegroup.com/API/PhotoUpload.php', true);
  // xhr.responseType = 'json';
  // xhr.send(data);
  // xhr.onload = () => {
  //   console.log(xhr.response);
  //   // dispatch(newPhoto(xhr.response))
  //   // dispatch(loader())
  //   // id === 'uploader' && dispatch(edit())
  // }
};
export const setDescriptionAPI = async (raw) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.objects.setDescription',
    fields: raw,
  });
  if (res?.statusText === 'OK') {
    return 'OK';
  }
  return '';
};
export const onRepublication = async (raw) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.objects.Republication',
    fields: raw,
  });
  if (res?.statusText === 'OK') {
    return 'OK';
  }
  return '';
};
export const setNewVideo = async (raw) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.objects.setVideo',
    fields: raw,
  });
  if (res?.statusText === 'OK') {
    return 'OK';
  }
  return '';
};
export const addToMyObject = async (raw) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.objects.toMy',
    fields: raw,
  });
  if (res?.statusText === 'OK') {
    return 'OK';
  }
  return '';
};
export const getChartView = async (raw) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.objects.getGraph',
    fields: raw,
  });
  if (res?.statusText === 'OK') {
    return res?.data?.result || null;
  }
  return null;
};
export const setObjectExclusive = async (raw) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.objects.setExclusive',
    fields: raw,
  });
  if (res?.statusText === 'OK') {
    return 'OK';
  }
  return '';
};
export const setObjectExclusiveDate = async (raw) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.objects.setExclusiveDate',
    fields: raw,
  });
  if (res?.statusText === 'OK') {
    return 'OK';
  }
  return '';
};
export const setObjectContact = async (raw) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.objects.setContact',
    fields: raw,
  });
  if (res?.statusText === 'OK') {
    return 'OK';
  }
  return '';
};
export const createAndSetContact = async (raw) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.objects.createAndSetContact',
    fields: raw,
  });
  if (res?.statusText === 'OK') {
    return res?.data?.result || null;
  }
};
export const setFake = async (raw) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.objects.stampFake',
    fields: raw,
  });
  if (res?.statusText === 'OK') {
    return 'OK';
  }
  return 'No OK';
};
export const getObjectsChatList = async (raw) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.objects.getMessages',
    fields: raw,
  });
  if (res?.statusText === 'OK') {
    return res?.data?.result || null;
  }
};
export const getObjectDemandsList = async (raw) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.objects.getDemands',
    fields: raw,
  });
  if (res?.statusText === 'OK') {
    return res?.data?.result || null;
  }
};
export const sendPhotoToTg = async (raw) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.objects.sendPhotoToTg',
    fields: raw,
  });
  if (res?.statusText === 'OK') {
    return res?.data?.result || null;
  }
};
export const copyObjects = async (raw) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.objects.copyObjects',
    fields: raw,
  });
  if (res?.statusText === 'OK') {
    return res?.data?.result || null;
  }
};
export const getImageOffer = async (raw) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.offers.create',
    fields: raw,
  });
  if (res?.statusText === 'OK') {
    return 'OK';
  }
};
export const getPrintLink = async (raw) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.objects.getPrintLink',
    fields: raw,
  });
  if (res?.statusText === 'OK') {
    const result = res.data.result;
    if (result.result === 'OK') {
      return result.URL;
    }
    return null;
  }
  return null;
};
