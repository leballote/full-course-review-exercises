function createZeroRow(width) {
  const row = [];
  for (let i = 0; i < width; i++) {
    row.push(0);
  }
  return row;
}

function createZeroMatrix(height, width) {
  const zeroMatrix = [];
  for (let i = 0; i < height; i++) {
    zeroMatrix.push(createZeroRow(width || 0));
  }

  return zeroMatrix;
}

class MatrixNode {
  #matrix;
  constructor(matrix, i, j) {
    this.#matrix = matrix;
    this.value = matrix[i][j];
    this.i = i;
    this.j = j;
  }

  get neighbors() {
    const out = [];
    let i = this.i;
    let j = this.j;
    let matrix = this.#matrix;
    if (matrix[i] && matrix[i][j + 1])
      out.push(new MatrixNode(this.#matrix, i, j + 1));
    if (matrix[i] && matrix[i][j - 1])
      out.push(new MatrixNode(this.#matrix, i, j - 1));
    if (matrix[i + 1] && matrix[i + 1][j])
      out.push(new MatrixNode(this.#matrix, i + 1, j));
    if (matrix[i - 1] && matrix[i - 1][j])
      out.push(new MatrixNode(this.#matrix, i - 1, j));
    return out;
  }
}

function findFloodFilledAreaAndLabel({ matrix, labelMatrix, i, j, label }) {
  const stack = [new MatrixNode(matrix, i, j)];
  let area = 0;
  labelMatrix[i][j] = label;
  while (stack.length > 0) {
    const element = stack.pop();
    area++;
    for (const neighbor of element.neighbors) {
      if (labelMatrix[neighbor.i][neighbor.j] == 0) {
        labelMatrix[neighbor.i][neighbor.j] = label;
        stack.push(neighbor);
      }
    }
  }
  return area;
}

export function findGreatestRectangleArea(matrix) {
  const H = matrix.length;
  const W = matrix[0].length || 0;
  let maxArea = 0;
  let label = 1;
  const labelMatrix = createZeroMatrix(H, W);
  for (let i = 0; i < H; i++) {
    for (let j = 0; j < W; j++) {
      if (matrix[i][j] == 1 && labelMatrix[i][j] == 0) {
        const newArea = findFloodFilledAreaAndLabel({
          matrix,
          labelMatrix,
          i,
          j,
          label: label++,
        });
        maxArea = Math.max(newArea, maxArea);
      }
    }
  }

  return maxArea;
}
