export const getRoundDigit = (n: number, underDigit: number) => {
  return Math.round(n * Math.pow(10, underDigit)) / Math.pow(10, underDigit);
};
