import { useEffect, useState } from "react";
import { Letter } from "../letter/Letter";
import { v4 as uuidv4 } from "uuid";
import "./game.css";
import { createWordMatrix } from "../../utils/createWordMatrix";
import { Keyboard } from "../keyboard/Keyboard";
import { copyMatrix } from "../../utils/copyMatrix";
import { modifyMatrix, modifyMatrixRow } from "../../utils/modifyMatrix";
import { usePrevious } from "../../hooks/usePrevious";
import { getCommonChars } from "../../utils/getCommonChars";
import { getCorrectPositionOfLetters } from "../../utils/getCorrectPositionOfLetters";
import { isGameEnd } from "../../utils/isGameEnd";
import Message from "../message/Message";
import { MESSAGE_TYPE, Maybe } from "../../types/types";
import { isValidKeyboardChar } from "../../utils/isValidKeyboardChar";
import {
  BACKSPACE_KEYDOWN,
  DEFAULT_ROWS_AMOUNT,
  LIGHT_MODE_TITLE,
} from "../../constants";
import { useAppSelector } from "../../hooks/useAppSelector";
import { fetchRandomWord } from "../../utils/fetchRandomWord";
import { shuffleWord } from "../../utils/shuffleWord";

type Props = {
  win: boolean;
  onWin: (state: boolean) => void;
};

export const Game = ({ win, onWin }: Props) => {
  const { wordLength } = useAppSelector((state) => state.settings);
  const { options } = useAppSelector((state) => state.settings);

  const [secretWord, setSecretWord] = useState("");
  const [wordMatrix, setWordMatrix] = useState<Maybe<string>[][]>(() =>
    createWordMatrix(DEFAULT_ROWS_AMOUNT, wordLength)
  );
  const [rowPointer, setRowPointer] = useState(0);
  const [colPointer, setColPointer] = useState(0);
  const [revealedChars, setRevealedChars] = useState<string[]>([]);
  const [charsOnCorrectPositions, setCharsOnCorrectPositions] = useState<
    string[][]
  >([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isGameInProcess, setIsGameInProcess] = useState(false);

  const [selectedLetter, setSelectedLetter] = useState<Maybe<string>>(null);

  const rowRef = usePrevious(rowPointer);
  const prevRowPointer = rowRef.current;
  const lightModeOption = options.find((o) => o.title === LIGHT_MODE_TITLE);
  const isLightModeOpiton = lightModeOption?.isChecked;

  // build new matrix on new word length
  useEffect(() => {
    fetchRandomWord(wordLength).then((secretWord) => {
      const newWordMatrix = createWordMatrix(
        DEFAULT_ROWS_AMOUNT,
        secretWord.length
      );
      if (isLightModeOpiton) {
        const shuffledWord = [...shuffleWord(secretWord)];
        modifyMatrixRow(newWordMatrix, 0, shuffledWord);
        setRowPointer(rowPointer + 1);
      }
      setWordMatrix(newWordMatrix);
      setSecretWord(secretWord);
    });
  }, [wordLength, isLightModeOpiton]);

  // Keydown handler
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (isGameOver) {
        window.removeEventListener("keydown", handleKeydown);
        return;
      }

      const key = e.key;
      let newRowPointer, newColPointer;
      const isValidChar = isValidKeyboardChar(key);

      if (key === BACKSPACE_KEYDOWN) {
        const { newRow, newCol } = handleBackspace();
        newRowPointer = newRow;
        newColPointer = newCol;
      } else if (isValidChar) {
        const { newRow, newCol } = handleRegularKey(key);
        newRowPointer = newRow;
        newColPointer = newCol;
      } else {
        console.log(key);
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
        colPointer === secretWord.length - 1 ? rowPointer + 1 : rowPointer;
      let newColPointer =
        colPointer === secretWord.length - 1 ? 0 : colPointer + 1;

      const newWordMatrix = modifyMatrix(
        copyMatrix(wordMatrix),
        rowPointer,
        colPointer,
        key
      );

      setWordMatrix(newWordMatrix);
      setSelectedLetter(key);
      setIsGameInProcess(true);

      return { newRow: newRowPointer, newCol: newColPointer };
    };

    const handleKeyboardButtonClick = (e: MouseEvent) => {
      const clickedElement = e.target as HTMLElement;
      const isKeyboardLetter =
        clickedElement.classList.contains("letter--keyboard");
      if (isKeyboardLetter) {
        const key = clickedElement.innerHTML;
        // handler
        if (isGameOver) {
          return;
        }

        let newRowPointer, newColPointer;
        const isValidChar = isValidKeyboardChar(key);

        if (key === BACKSPACE_KEYDOWN || key === "backspace") {
          const { newRow, newCol } = handleBackspace();
          newRowPointer = newRow;
          newColPointer = newCol;
        } else if (isValidChar) {
          const { newRow, newCol } = handleRegularKey(key);
          newRowPointer = newRow;
          newColPointer = newCol;
        } else {
          console.log(key);
          return;
        }

        setRowPointer(newRowPointer);
        setColPointer(newColPointer);
      }
    };

    window.addEventListener("click", handleKeyboardButtonClick);
    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("click", handleKeyboardButtonClick);
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [rowPointer, colPointer, wordMatrix, isGameOver]);

  // Submit word
  useEffect(() => {
    let guessedWord =
      prevRowPointer !== null ? wordMatrix[prevRowPointer].join("") : null;

    if (guessedWord) {
      guessedWord = guessedWord.toLowerCase();
      const commonChars = getCommonChars(guessedWord, secretWord);
      console.log(guessedWord);
      setRevealedChars(revealedChars.concat(commonChars));

      const correctPositions = getCorrectPositionOfLetters(
        guessedWord,
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
      onWin(true);
      setIsGameOver(true);
    } else if (rowPointer === DEFAULT_ROWS_AMOUNT) {
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

      {isGameOver && win && <Message type={MESSAGE_TYPE.WIN} />}
      {isGameOver && !win && <Message type={MESSAGE_TYPE.LOSE} />}

      <Keyboard />
    </>
  );
};
