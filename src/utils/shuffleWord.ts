export const shuffleWord = (word: string) => {
  const characters = word.split("");

  for (let i = characters.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [characters[i], characters[j]] = [characters[j], characters[i]];
  }

  const shuffledWord = characters.join("");
  return shuffledWord;
};
