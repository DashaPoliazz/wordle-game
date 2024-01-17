import cN from "classnames";
import "./letter.css";
import { useState } from "react";

type Maybe<T> = T | null;

type Props = {
  char?: Maybe<string>;
  isKeyboardLetter?: boolean;
  isSelected?: boolean;
  letterElsewhere?: boolean;
  letterCorrect?: boolean;
};

const ENTER = "enter";
const BACKSPACE = "backspace";

export const Letter = ({
  char,
  isKeyboardLetter,
  isSelected,
  letterElsewhere,
  letterCorrect,
}: Props) => {
  const isLongLetter = char === ENTER || char === BACKSPACE;

  return (
    <div
      className={cN("game__letter", {
        "letter--long": isLongLetter,
        "letter--keyboard": isKeyboardLetter,
        "letter--dark": isKeyboardLetter,
        "letter--selected": isSelected,
        "letter--elsewhere": letterElsewhere,
        "letter--correct": letterCorrect,
      })}
    >
      {char}
    </div>
  );
};
