function createEmptyRow(width) {
  return Array(width);
}

function createEmptyMatrix(height, width) {
  const zeroMatrix = [];
  for (let i = 0; i < height; i++) {
    zeroMatrix.push(createEmptyRow(width || 0));
  }
  return zeroMatrix;
}

export function findGreatestRectangleArea(matrix) {
  const H = matrix.length;
  const W = matrix[0].length || 0;
  if (H == 0 || W == 0) {
    return 0;
  }

  const heights = createEmptyRow(W);

  for (let j = 0; j < W; j++) {
    heights[j] = matrix[0][j];
  }
  let max = findLargestAreaInHistogram(heights);

  for (let i = 1; i < H; i++) {
    for (let j = 0; j < W; j++) {
      heights[j] = matrix[i][j] ? heights[j] + 1 : 0;
    }
    const candMax = findLargestAreaInHistogram(heights);
    max = Math.max(max, candMax);
  }

  return max;
}

function findLargestAreaInHistogram(histogram) {
  if (histogram.length == 0) {
    return 0;
  }
  let max = 0;
  const stack = [];
  let i = 0;

  while (i < histogram.length) {
    if (stack.length == 0 || histogram[i] >= histogram[stack.at(-1)]) {
      stack.push(i);
      i++;
    } else {
      const currentIndex = stack.pop();
      const currentEl = histogram[currentIndex];
      const width = stack.length > 0 ? i - stack.at(-1) - 1 : i;
      const candArea = currentEl * width;
      max = Math.max(candArea, max);
    }
  }

  while (stack.length > 0) {
    const currentIndex = stack.pop();
    const currentEl = histogram[currentIndex];
    const width = stack.length > 0 ? i - stack.at(-1) - 1 : i;
    const candArea = currentEl * width;
    max = Math.max(candArea, max);
  }
  return max;
}
