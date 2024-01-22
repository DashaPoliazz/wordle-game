import NumberOfLetters from "./numberOfLetters/NumberOfLetters";
import OptionBlock from "./optionblock/OptionBlock";
import { v4 as uuidv4 } from "uuid";
import "./settings.css";
import { IConfigOption } from "../../types/MessageType";

type Props = {
  onConfigChange: (title: string) => void;
  options: IConfigOption[];
  wordLength: number;
  onWordLengthChange: (len: number) => void;
};

const Settings = ({
  onConfigChange,
  options,
  wordLength,
  onWordLengthChange,
}: Props) => {
  return (
    <div className="settings">
      <NumberOfLetters
        wordLength={wordLength}
        onWordLengthChange={onWordLengthChange}
      />
      {options.map((option) => (
        <OptionBlock
          key={uuidv4()}
          onOptionChange={onConfigChange}
          title={option.title}
          description={option.description}
          isChecked={option.isChecked}
        />
      ))}
    </div>
  );
};

export default Settings;
