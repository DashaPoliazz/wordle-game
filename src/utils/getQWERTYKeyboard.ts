export const qwertyButtons = {
  backspace: "backspace",
  enter: "enter",
};

const QWERTY_CHARS = [
  "QWERTYUIOPASDFGHJKL",
  qwertyButtons.backspace,
  "ZXCVBNM",
  qwertyButtons.enter,
];

const KEYBOARD_ROWS_QUANTITY = 3;
const FIRST_ROW_START_INDEX = 0;
const FIRST_ROW_END_INDEX = 10;
const SECOND_ROW_END_INDEX = 19;

export const getQWERTYKeyboard = (): string[][] => {
  const plainChars: string[] = [];

  QWERTY_CHARS.forEach((item) => {
    if (qwertyButtons[item as keyof typeof qwertyButtons]) {
      plainChars.push(qwertyButtons[item as keyof typeof qwertyButtons]);
    } else {
      plainChars.push(...item);
    }
  });

  const keyboard: string[][] = [];

  for (let i = 0; i < KEYBOARD_ROWS_QUANTITY; i++) {
    if (i === 0) {
      const charsSlice = plainChars.slice(
        FIRST_ROW_START_INDEX,
        FIRST_ROW_END_INDEX
      );

      keyboard.push(charsSlice);
    } else if (i === 1) {
      const charsSlice = plainChars.slice(
        FIRST_ROW_END_INDEX,
        SECOND_ROW_END_INDEX
      );

      keyboard.push(charsSlice);
    } else {
      const charsSlice = plainChars.slice(SECOND_ROW_END_INDEX);

      keyboard.push(charsSlice);
    }
  }

  return keyboard;
};
