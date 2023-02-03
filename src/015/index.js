export function findBalanceIndex(array) {
  const sum = array.reduce((tot, x) => tot + x, 0);
  const half = sum / 2;
  let currentSum = 0;
  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    currentSum += element;
    if (currentSum === half) {
      return i;
    }
  }
  return -1;
}
