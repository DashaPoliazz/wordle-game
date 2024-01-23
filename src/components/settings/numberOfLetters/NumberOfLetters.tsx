import React, { useState } from "react";
import cN from "classnames";
import { v4 as uuidv4 } from "uuid";
import "./numberOfLetters.css";
import { useAppSelector } from "../../../hooks/useAppSelector";

type Props = {
  numbers?: number[];
  onWordLengthChange: (len: number) => void;
};

const DEFAULT_LENGTHES = [4, 5, 6, 7, 8, 9, 10, 11];

const generateDefaultLengthes = (start: number, end: number) => {
  if (start > end) return DEFAULT_LENGTHES;
  const len = end - start;
  const result = new Array(len).fill(1);

  for (let i = 0; i < len; i++) {
    if (i === 0) result[i] = start;
    else result[i] = result[i - 1] + 1;
  }
};

const NumberOfLetters = ({
  numbers = DEFAULT_LENGTHES,
  onWordLengthChange,
}: Props) => {
  const { wordLength } = useAppSelector((state) => state.settings);

  const handleNumberClick = (n: number) => {
    onWordLengthChange(n);
  };

  return (
    <div className="number-of-letters">
      <h2 className="number-of-letters__title">Number of letters</h2>
      <div className="number-of-letters__numbers">
        {numbers.map((n) => (
          <div
            key={uuidv4()}
            className={cN("number-of-letters__number", {
              "number-of-letters__number--active": n === wordLength,
            })}
            onClick={() => handleNumberClick(n)}
          >
            {n}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NumberOfLetters;
