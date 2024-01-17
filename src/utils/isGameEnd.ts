export const isGameEnd = (guessedWord: string[], randomWord: string) => {
  for (let idx = 0; idx < guessedWord.length; idx++) {
    if (randomWord[idx] !== guessedWord[idx]) {
      return false;
    }
  }

  return true;
};
