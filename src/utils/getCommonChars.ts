export const getCommonChars = (s1: string, s2: string): string[] => {
  const delta: string[] = [];
  const s1Set = new Set(s1.toLowerCase());
  const s2Set = new Set(s2.toLowerCase());

  for (const char of s1Set) {
    if (s2Set.has(char)) {
      delta.push(char.toLowerCase());
    }
  }

  return delta;
};
