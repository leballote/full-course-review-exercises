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
  const heights = createEmptyMatrix(H, W);
  for (let j = 0; j < W; j++) {
    heights[0][j] = matrix[0][j];
  }

  for (let i = 1; i < H; i++) {
    for (let j = 0; j < W; j++) {
      heights[i][j] = matrix[i][j] ? heights[i - 1][j] + 1 : 0;
    }
  }

  let max = 0;
  for (let i = 0; i < H; i++) {
    for (let j = 0; j < W; j++) {
      if (heights[i][j] === 0) continue;
      let width = 1;
      while (j - width >= 0 && heights[i][j - width] >= heights[i][j]) {
        width++;
      }
      let area = heights[i][j] * width;
      max = Math.max(max, area);
    }
  }

  return max;
}
