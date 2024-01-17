export const createWordMatrix = (row: number, col: number): string[][] => {
  return new Array(row).fill(null).map((_) => new Array(col).fill(""));
};
