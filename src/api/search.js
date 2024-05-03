import axios from 'axios';
const API = 'https://crm.metragegroup.com/API/REST.php';

export const getUserList = async (value) => {
  try {
    const res = await axios.post(API, {
      metrage_id: metrage_id || null,
      method: 'crm.users.find',
      fields: {
        request: value,
      },
    });
    if (res.statusText !== 'OK') {
      throw new Error('Error');
    }
    return res?.data?.result || [];
  } catch (error) {
    return [];
  }
};
export const getDealList = async (value) => {
  try {
    const res = await axios.post(API, {
      metrage_id: metrage_id || null,
      method: 'crm.dds.getDeals',
      fields: {
        request: value,
      },
    });
    if (res.statusText !== 'OK') {
      throw new Error('Error');
    }
    return res?.data?.result || [];
  } catch (error) {
    return [];
  }
};

export const getСontactList = async (value) => {
  try {
    const res = await axios.post(API, {
      metrage_id: metrage_id || null,
      method: 'crm.contact.find',
      fields: {
        request: value,
      },
    });
    if (res.statusText !== 'OK') {
      throw new Error('Error');
    }
    return res?.data?.result || [];
  } catch (error) {
    return [];
  }
};

export const getObjectList = async (value) => {
  try {
    const res = await axios.post(API, {
      metrage_id: metrage_id || null,
      method: 'crm.objects.find',
      fields: {
        request: value,
      },
    });
    if (res.statusText !== 'OK') {
      throw new Error('Error');
    }
    return res?.data?.result || [];
  } catch (error) {
    return [];
  }
};
export const getResidentialList = async (value) => {
  try {
    const res = await axios.post(API, {
      metrage_id: metrage_id || null,
      method: 'crm.jk.getByReq',
      fields: {
        request: value,
      },
    });
    if (res.statusText !== 'OK') {
      throw new Error('Error');
    }
    return res?.data?.result || [];
  } catch (error) {
    return [];
  }
};
export const getBuildersList = async (value) => {
  try {
    const res = await axios.post(API, {
      metrage_id: metrage_id || null,
      method: 'crm.developers.getByReq',
      fields: {
        request: value,
      },
    });
    if (res.statusText !== 'OK') {
      throw new Error('Error');
    }
    return res?.data?.result || [];
  } catch (error) {
    return [];
  }
};
export const getDeveloperlList = async (value) => {
  try {
    const res = await axios.post(API, {
      metrage_id: metrage_id || null,
      method: 'crm.deal.getKpDeveloper',
      fields: {
        request: value,
      },
    });
    if (res.statusText !== 'OK') {
      throw new Error('Error');
    }
    return res?.data?.result || [];
  } catch (error) {
    return [];
  }
};
export const getOfficeList = async (value) => {
  try {
    const res = await axios.post(API, {
      metrage_id: metrage_id || null,
      method: 'crm.demand.getInterGroups',
    });
    if (res.statusText !== 'OK') {
      throw new Error('Error');
    }
    return res?.data?.result || [];
  } catch (error) {
    return [];
  }
};
export const getLocalOfficeList = async (reqValue) => {
  try {
    const res = await axios.post(process.env.MAIN_API, {
      metrage_id: metrage_id || null,
      method: 'crm.dashboard.getOffices',
      fields: {
        req: reqValue,
      },
    });
    if (res.statusText !== 'OK') {
      throw new Error('Error');
    }
    return res?.data?.result || [];
  } catch (error) {
    return [];
  }
};
export const findBuilderList = async (reqValue) => {
  try {
    const res = await axios.post(process.env.MAIN_API, {
      metrage_id: metrage_id || null,
      method: 'crm.jk.getDevelopers',
      fields: {
        req: reqValue,
      },
    });
    if (res.statusText !== 'OK') {
      throw new Error('Error');
    }
    return res?.data?.result || [];
  } catch (error) {
    return [];
  }
};
export const getLegalList = async (reqValue) => {
  try {
    const res = await axios.post(process.env.MAIN_API, {
      metrage_id: metrage_id || null,
      method: 'crm.dds.listLegal',
      fields: {
        req: reqValue,
      },
    });
    if (res.statusText !== 'OK') {
      throw new Error('Error');
    }
    return res?.data?.result || [];
  } catch (error) {
    return [];
  }
};
export const getBankList = async (reqValue) => {
  try {
    const res = await axios.post(process.env.MAIN_API, {
      metrage_id: metrage_id || null,
      method: 'crm.dds.listBank',
      fields: {
        req: reqValue,
      },
    });
    if (res.statusText !== 'OK') {
      throw new Error('Error');
    }
    return res?.data?.result || [];
  } catch (error) {
    return [];
  }
};
