export const formatNumber = (num: number): string => {
  if (num >= 10000) {
    const w = Math.floor(num / 10000);
    const remainder = num % 10000;
    const k = Math.floor(remainder / 1000);
    if (k === 0) {
      return `${w.toFixed(1)}w`;
    } else {
      return `${(w + k / 10).toFixed(1)}w`;
    }
  } else if (num >= 1000) {
    const k = Math.floor(num / 1000);
    const remainder = num % 1000;
    if (remainder === 0) {
      return `${k}k`;
    } else {
      return `${(k + remainder / 1000).toFixed(1)}k`;
    }
  } else {
    return `${num}`;
  }
};
