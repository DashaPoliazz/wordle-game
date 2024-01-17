export const modifyMatrix = <T>(
  matrix: T[][],
  row: number,
  col: number,
  value: T
): T[][] => {
  matrix[row][col] = value;
  return matrix;
};

export const modifyMatrixRow = <T>(
  matrix: T[][],
  rowIdx: number,
  newRow: T[]
) => {
  matrix[rowIdx] = newRow;
  return matrix;
};
