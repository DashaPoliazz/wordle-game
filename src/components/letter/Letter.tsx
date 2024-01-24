import cN from "classnames";
import "./letter.css";
import { useAppSelector } from "../../hooks/useAppSelector";
import { HARD_MODE_TITLE } from "../../constants";

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
  const { options } = useAppSelector((state) => state.settings);

  const isLongLetter = char === ENTER || char === BACKSPACE;
  const hardModeOption = options.find((o) => o.title === HARD_MODE_TITLE);
  const isHardModeActive = hardModeOption?.isChecked;
  const isBackspaceButton = char === BACKSPACE;
  const isLetterDisabled = isBackspaceButton && isHardModeActive;

  return (
    <div
      className={cN("game__letter", {
        "letter--long": isLongLetter,
        "letter--keyboard": isKeyboardLetter,
        "letter--dark": isKeyboardLetter,
        "letter--selected": isSelected,
        "letter--elsewhere": letterElsewhere && !isHardModeActive,
        "letter--correct": letterCorrect,
        "letter--disabled": isLetterDisabled,
      })}
    >
      {char}
    </div>
  );
};
