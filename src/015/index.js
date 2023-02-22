export function findBalanceIndex(array) {
  let i = 0;
  let j = array.length - 1;
  let leftSum = 0;
  let rightSum = 0;
  while (i <= j) {
    if (leftSum < rightSum) {
      leftSum += array[i];
      i++;
    } else {
      rightSum += array[j];
      j--;
    }
  }
  if (leftSum === rightSum) {
    return j;
  }
  return -1;
}
