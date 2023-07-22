export const useNumberTriad = (number) => {
  return number.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ');
}