import React from "react";
import "./keyboard.css";
import { v4 as uuidv4 } from "uuid";
import { Letter } from "../letter/Letter";
import { getQWERTYKeyboard } from "../../utils/getQWERTYKeyboard";

type Props = {};

const QWERTY_KEYBOARD = getQWERTYKeyboard();

export const Keyboard = (props: Props) => {
  return (
    <div className="keyboard">
      {QWERTY_KEYBOARD.map((row) => (
        <div className="keyboard__row" key={uuidv4()}>
          {row.map((char) => (
            <Letter char={char} key={uuidv4()} isKeyboardLetter={true} />
          ))}
        </div>
      ))}
    </div>
  );
};
