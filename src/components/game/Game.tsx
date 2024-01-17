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
import { MESSAGE_TYPE } from "../../types/MessageType";

type Props = {};
type Maybe<T> = T | null;

const WORD_LENGTH = 6;
const DEFAULT_ROWS_AMOUNT = 6;
const DEFAULT_COLS_AMOUNT = 6;

export const Game = (props: Props) => {
  const [randomWord, setRandomWord] = useState("");
  const [wordMatrix, setWordMatrix] = useState<string[][]>([]);
  const [rowPointer, setRowPointer] = useState(0);
  const [colPointer, setColPointer] = useState(0);
  const [commonChars, setCommonChars] = useState<string[]>([]);
  const [revealedChars, setRevealedChars] = useState<string[]>([]);
  const [charsOnCorrectPositions, setCharsOnCorrectPositions] = useState<
    string[][]
  >([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isGameWin, setIsGameWin] = useState(false);

  const [selectedLetter, setSelectedLetter] = useState<Maybe<string>>(null);

  const rowRef = usePrevious(rowPointer);
  const prevRowPointer = rowRef.current;

  // Inititialize state
  useEffect(() => {
    const wordMatrix = createWordMatrix(
      DEFAULT_ROWS_AMOUNT,
      DEFAULT_COLS_AMOUNT
    );
    setWordMatrix(wordMatrix);
    fetchRandomWord(WORD_LENGTH).then(setRandomWord);
  }, []);

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      let newRowPointer =
        colPointer === DEFAULT_COLS_AMOUNT - 1 ? rowPointer + 1 : rowPointer;
      let newColPointer =
        colPointer === DEFAULT_COLS_AMOUNT - 1 ? 0 : colPointer + 1;

      const newWordMatrix = modifyMatrix(
        copyMatrix(wordMatrix),
        rowPointer,
        colPointer,
        e.key
      );

      setWordMatrix(newWordMatrix);
      setRowPointer(newRowPointer);
      setColPointer(newColPointer);
      setSelectedLetter(e.key);
    };

    if (isGameOver) {
      window.removeEventListener("keydown", handleKeydown);
      return;
    }

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
      const commonChars = getCommonChars(guessedWord, randomWord);
      setCommonChars(commonChars);
      setRevealedChars(revealedChars.concat(commonChars));

      const correctPositions = getCorrectPositionOfLetters(
        guessedWord,
        randomWord
      );
      const newCharsOnCorrectPositions = modifyMatrixRow(
        copyMatrix(charsOnCorrectPositions),
        prevRowPointer!,
        correctPositions
      );
      setCharsOnCorrectPositions(newCharsOnCorrectPositions);
      if (isGameEnd(guessedWord, randomWord)) {
        console.log(isGameEnd(guessedWord, randomWord));
        setIsGameWin(true);
        setIsGameOver(true);
      }
    }
  }, [rowPointer, prevRowPointer]);

  // Other computattions
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
        {wordMatrix.map((row, rowIdx) => (
          <div className="game__row" key={uuidv4()}>
            {row.map((_, colIdx) => (
              <Letter
                key={uuidv4()}
                char={wordMatrix[rowIdx][colIdx]}
                isSelected={isSelected(rowIdx, colIdx)}
                letterElsewhere={letterElsewhere(wordMatrix[rowIdx][colIdx])}
                letterCorrect={isCharOnCorrectPosition(rowIdx, colIdx)}
              />
            ))}
          </div>
        ))}
      </div>

      {isGameOver && isGameWin && <Message type={MESSAGE_TYPE.WIN} />}
      {isGameOver && !isGameWin && <Message type={MESSAGE_TYPE.LOSE} />}

      <Keyboard />
    </>
  );
};
