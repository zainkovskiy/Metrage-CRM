import moment from "moment";

export const useDateFormat = (date, format) => {
  if (date) {
    return moment(date).locale('ru').format(format ? format : 'DD MMMM YYYY');
  }
  return null
}

export const useChatDate = (date) => {
  if (date) {
    if (moment().isSame(moment(date), 'day')) {
      return moment(date).format('HH:mm')
    }
    if (moment().day(1).isSame(moment(date).day(1), 'day')) {
      return moment(date).locale('ru').format('dd')
    }
    return moment(date).locale('ru').format('DD.MM.YYYY');
  }
  return null
}