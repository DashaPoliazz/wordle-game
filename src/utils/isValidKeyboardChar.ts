import { getQWERTYKeyboard } from "./getQWERTYKeyboard";

const identity = (x: any) => x;
const plainKeyboard = getQWERTYKeyboard()
  .flatMap(identity)
  .map((char) => char.toLowerCase());

export const isValidKeyboardChar = (char: string) => {
  return plainKeyboard.includes(char.toLowerCase());
};
