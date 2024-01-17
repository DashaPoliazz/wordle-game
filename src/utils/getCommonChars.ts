type argument = string | string[];

export const getCommonChars = (s1: argument, s2: argument): string[] => {
  const delta: string[] = [];
  const s1Set = new Set(s1);
  const s2Set = new Set(s2);

  for (const char of s1Set) {
    if (s2Set.has(char)) {
      delta.push(char);
    }
  }

  return delta;
};
