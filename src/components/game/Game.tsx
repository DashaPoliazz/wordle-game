import { useEffect, useState } from "react";
import { Letter } from "../letter/Letter";
import { v4 as uuidv4 } from "uuid";
import "./game.css";
import { createWordMatrix } from "../../utils/createWordMatrix";
import { Keyboard } from "../keyboard/Keyboard";
import { fetchRandomWord } from "../../utils/fetchRandomWord";
import { copyMatrix } from "../../utils/copyMatrix";
import { modifyMatrix, modifyMatrixRow } from "../../utils/modifyMatrix";
import { usePrevious } from "../../hooks/usePrevious";
import { getCommonChars } from "../../utils/getCommonChars";
import { getCorrectPositionOfLetters } from "../../utils/getCorrectPositionOfLetters";
import { isGameEnd } from "../../utils/isGameEnd";
import Message from "../message/Message";
import { MESSAGE_TYPE, Maybe } from "../../types/MessageType";
import { isValidKeyboardChar } from "../../utils/isValidKeyboardChar";

type Props = {
  secretWord: string;
};

const WORD_LENGTH = 6;
const DEFAULT_ROWS_AMOUNT = 6;
const DEFAULT_COLS_AMOUNT = 6;
const BACKSPACE_KEYDOWN = "Backspace";

// TODO:
// [ ] 1. Remove ugly "as" typecasts.
// [ ] 2. Decompose component.
// [ ] 3. Do transitions between rows only if word is valid
// [ ] 4. Implement settings (wordLength, highlighting setting, language)
// [ ] 5. Implement loader for fetching word
// [ ] 6. Rename vaiables semanthically

export const Game = ({ secretWord }: Props) => {
  const [wordMatrix, setWordMatrix] = useState<Maybe<string>[][]>(() =>
    createWordMatrix(DEFAULT_ROWS_AMOUNT, DEFAULT_COLS_AMOUNT)
  );
  const [rowPointer, setRowPointer] = useState(0);
  const [colPointer, setColPointer] = useState(0);
  const [revealedChars, setRevealedChars] = useState<string[]>([]);
  const [charsOnCorrectPositions, setCharsOnCorrectPositions] = useState<
    string[][]
  >([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isGameWin, setIsGameWin] = useState(false);

  const [selectedLetter, setSelectedLetter] = useState<Maybe<string>>(null);

  const rowRef = usePrevious(rowPointer);
  const prevRowPointer = rowRef.current;

  // Keydown handler
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (isGameOver) {
        window.removeEventListener("keydown", handleKeydown);
        return;
      }

      let newRowPointer, newColPointer;
      const isValidChar = isValidKeyboardChar(e.key);

      if (e.key === BACKSPACE_KEYDOWN) {
        const { newRow, newCol } = handleBackspace();
        newRowPointer = newRow;
        newColPointer = newCol;
      } else if (isValidChar) {
        const { newRow, newCol } = handleRegularKey(e.key);
        newRowPointer = newRow;
        newColPointer = newCol;
      } else {
        console.log(e.key);
        return;
      }

      setRowPointer(newRowPointer);
      setColPointer(newColPointer);
    };

    const handleBackspace = () => {
      let newRowPointer = rowPointer;
      let newColPointer = colPointer === 0 ? colPointer : colPointer - 1;

      const newWordMatrix = modifyMatrix(
        copyMatrix(wordMatrix),
        rowPointer,
        colPointer,
        ""
      );

      setWordMatrix(newWordMatrix);
      setSelectedLetter(null);

      return { newRow: newRowPointer, newCol: newColPointer };
    };

    const handleRegularKey = (key: string) => {
      let newRowPointer =
        colPointer === DEFAULT_COLS_AMOUNT - 1 ? rowPointer + 1 : rowPointer;
      let newColPointer =
        colPointer === DEFAULT_COLS_AMOUNT - 1 ? 0 : colPointer + 1;

      const newWordMatrix = modifyMatrix(
        copyMatrix(wordMatrix),
        rowPointer,
        colPointer,
        key
      );

      setWordMatrix(newWordMatrix);
      setSelectedLetter(key);

      return { newRow: newRowPointer, newCol: newColPointer };
    };

    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [rowPointer, colPointer, wordMatrix, isGameOver]);

  // Submit word
  useEffect(() => {
    const guessedWord =
      prevRowPointer !== null ? wordMatrix[prevRowPointer] : null;

    if (guessedWord) {
      const commonChars = getCommonChars(guessedWord as string[], secretWord);
      setRevealedChars(revealedChars.concat(commonChars));

      const correctPositions = getCorrectPositionOfLetters(
        guessedWord as string[],
        secretWord
      );
      const newCharsOnCorrectPositions = modifyMatrixRow(
        copyMatrix(charsOnCorrectPositions),
        prevRowPointer!,
        correctPositions
      );
      setCharsOnCorrectPositions(newCharsOnCorrectPositions);
    }
  }, [rowPointer, prevRowPointer]);

  // Handle end of the game
  useEffect(() => {
    const guessedWord = wordMatrix[rowPointer - 1];
    if (!guessedWord) return;
    const isWordDecoded = isGameEnd(guessedWord as string[], secretWord);
    if (isWordDecoded) {
      setIsGameWin(true);
      setIsGameOver(true);
    } else if (rowPointer === DEFAULT_ROWS_AMOUNT) {
      setIsGameWin(false);
      setIsGameOver(true);
    }
  }, [rowPointer, colPointer]);

  // Computattions
  const isSelected = (row: number, col: number) =>
    wordMatrix[row][col] === selectedLetter;
  const letterElsewhere = (char: string) => {
    if (!char) return false;
    return revealedChars.includes(char);
  };
  const isCharOnCorrectPosition = (rowIdx: number, colIdx: number) => {
    if (!charsOnCorrectPositions[rowIdx]) return false;
    return (
      charsOnCorrectPositions[rowIdx][colIdx] === wordMatrix[rowIdx][colIdx]
    );
  };

  return (
    <>
      <div className="game">
        <div className="game__rows">
          {wordMatrix.map((row, rowIdx) => (
            <div className="game__row" key={uuidv4()}>
              {row.map((_, colIdx) => {
                const char = wordMatrix[rowIdx][colIdx] as string;
                return (
                  <Letter
                    key={uuidv4()}
                    char={char}
                    isSelected={isSelected(rowIdx, colIdx)}
                    letterElsewhere={letterElsewhere(char)}
                    letterCorrect={isCharOnCorrectPosition(rowIdx, colIdx)}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {isGameOver && isGameWin && <Message type={MESSAGE_TYPE.WIN} />}
      {isGameOver && !isGameWin && <Message type={MESSAGE_TYPE.LOSE} />}

      <Keyboard />
    </>
  );
};
