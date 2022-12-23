export function reverseBlocks(arr, N) {
  if (N <= 0) {
    throw new Error("The block size should be positive");
  }
  const noNBlocks = Math.floor(arr.length / N);
  const completeBlocksLength = N * noNBlocks;
  for (let i = 0; i < completeBlocksLength; i += N) {
    reverseRange(arr, i, i + N);
  }

  if (completeBlocksLength < arr.length) {
    reverseRange(arr, completeBlocksLength, arr.length);
  }
  return arr;
}

//range right exclusive
function reverseRange(arr, i, j, exclusive = true) {
  let J = exclusive ? j - 1 : j;
  let temp;
  const rangeLength = j - i;
  for (let k = 0; k < Math.ceil(rangeLength / 2); k++) {
    temp = arr[J - k];
    arr[J - k] = arr[i + k];
    arr[i + k] = temp;
  }
}
