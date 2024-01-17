export const getCorrectPositionOfLetters = (
  guessedWord: string[],
  randomWord: string
): string[] => {
  const table: string[] = new Array(randomWord.length).fill(null);

  for (let i = 0; i < guessedWord.length; i++) {
    if (guessedWord[i] === randomWord[i]) {
      table[i] = randomWord[i];
    }
  }

  return table;
};
