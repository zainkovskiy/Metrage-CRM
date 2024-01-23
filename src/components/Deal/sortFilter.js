import moment from 'moment';

export const sortFilter = (a, b, sourceFilter) => {
  switch (sourceFilter) {
    case 'numberUp':
      return numberUp(a, b);
    case 'numberDown':
      return numberDown(a, b);
    case 'addressUp':
      return addressUp(a, b);
    case 'addressDown':
      return addressDown(a, b);
    case 'dateUp':
      return dateUp(a, b);
    case 'dateDown':
      return dateDown(a, b);
    case 'lawyerUp':
      return lawyerUp(a, b);
    case 'lawyerDown':
      return lawyerDown(a, b);
    case 'office':
      return officeUp(a, b);
    default:
      return;
  }
};
const numberUp = (a, b) => {
  if (a.UID < b.UID) {
    return -1;
  }
  if (a.UID > b.UID) {
    return 1;
  }
  return 0;
};
const numberDown = (a, b) => {
  if (a.UID > b.UID) {
    return -1;
  }
  if (a.UID < b.UID) {
    return 1;
  }
  return 0;
};
const addressUp = (a, b) => {
  const str1 = a.dealTitle;
  const str2 = b.dealTitle;
  return str1.localeCompare(str2);
};
const addressDown = (a, b) => {
  const str1 = a.dealTitle;
  const str2 = b.dealTitle;
  return str2.localeCompare(str1);
};
const dateUp = (a, b) => {
  const str1 = a.plannedDate;
  const str2 = b.plannedDate;
  if (moment(str1).isBefore(str2)) {
    return -1;
  }
  if (moment(str2).isBefore(str1)) {
    return 1;
  }
  return 0;
};
const dateDown = (a, b) => {
  const str1 = a.plannedDate;
  const str2 = b.plannedDate;
  if (moment(str1).isAfter(str2)) {
    return -1;
  }
  if (moment(str2).isAfter(str1)) {
    return 1;
  }
  return 0;
};
const lawyerUp = (a, b) => {
  const str1 = a.lawyerName;
  const str2 = b.lawyerName;
  return str1.localeCompare(str2);
};
const lawyerDown = (a, b) => {
  const str1 = a.lawyerName;
  const str2 = b.lawyerName;
  return str2.localeCompare(str1);
};
const officeUp = (a, b) => {
  const str1 = a.office;
  const str2 = b.office;
  return str2.localeCompare(str1);
};
