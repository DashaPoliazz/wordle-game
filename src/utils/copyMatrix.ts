export const copyMatrix = <T>(matrix: T[][]): T[][] => {
  return [...matrix].map((row) => [...row]);
};
