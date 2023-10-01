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
// export const createNewObject = async (object) => {
//   const res = await axios.post(API, {
//     metrage_id: metrage_id || null,
//     method:
//       object?.typeEstate === 'commercial'
//         ? 'crm.objects.addBusiness'
//         : 'crm.objects.add',
//     fields: object,
//   });
//   if (res?.statusText === 'OK') {
//     return 'OK';
//   }
// };
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
export const getPublication = async (id, estate) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.objects.getPublication',
    fields: {
      UID: id,
      type: estate,
    },
  });
  if (res?.statusText === 'OK') {
    return res?.data?.result || {};
  }
  return {};
};
export const setPublication = async (id, estate, date) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.objects.setPublication',
    fields: {
      UID: id,
      type: estate,
      date: date,
    },
  });
  if (res?.statusText === 'OK') {
    return 'OK';
  }
  return 'NO OK';
};
export const getPhotoListAPI = async (UID, estate) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.objects.getPhoto',
    fields: {
      UID: UID,
      type: estate,
    },
  });
  if (res?.statusText === 'OK') {
    return res?.data?.result || [];
  }
  return [];
};
export const setChangePhotoListAPI = async (UID, estate, newArr) => {
  const res = await axios.post(API, {
    metrage_id: metrage_id || null,
    method: 'crm.objects.finishPhoto',
    fields: {
      UID: UID,
      type: estate,
      photos: newArr,
    },
  });
  if (res?.statusText === 'OK') {
    return 'OK';
  }
  return '';
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
