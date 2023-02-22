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
  let maxArea = 0;
  let label = 1;
  const dp = createEmptyMatrix(H, W);
  for (let i = 0; i < H; i++) {
    for (let j = 0; j < W; j++) {
      dp[[]];
    }
  }
}
