import moment from "moment";

export const useDateFormat = (date) => {
  if (date){
    return moment(date).locale('ru').format('DD MMMM YYYY');
  }
  return null
}