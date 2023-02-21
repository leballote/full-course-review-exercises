export function mergeArrays(largeArray, smallArray) {
  if (largeArray.length < smallArray.length) {
    return mergeArrays(smallArray, largeArray);
  }
  let k = largeArray.length - 1;
  let i = largeArray.length - smallArray.length - 1;
  let j = smallArray.length - 1;
  while (i >= 0 && j >= 0) {
    if (largeArray[i] > smallArray[j]) {
      largeArray[k] = largeArray[i--];
    } else {
      largeArray[k] = smallArray[j--];
    }
    k--;
  }
  while (i >= 0) {
    largeArray[k--] = largeArray[i--];
  }
  while (j >= 0) {
    largeArray[k--] = smallArray[j--];
  }
}
