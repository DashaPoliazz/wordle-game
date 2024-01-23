import NumberOfLetters from "./numberOfLetters/NumberOfLetters";
import OptionBlock from "./optionblock/OptionBlock";
import { v4 as uuidv4 } from "uuid";
import "./settings.css";
import { useActions } from "../../hooks/useActions";
import { useAppSelector } from "../../hooks/useAppSelector";

type Props = {};

const Settings = ({}: Props) => {
  const { options } = useAppSelector((state) => state.settings);
  const { setWordLength } = useActions();

  const handleWordLengthChange = (wordLength: number) => {
    setWordLength(wordLength);
  };

  return (
    <div className="settings">
      <NumberOfLetters onWordLengthChange={handleWordLengthChange} />
      {options.map(({ title, description, isChecked }) => (
        <OptionBlock
          title={title}
          description={description}
          isChecked={isChecked}
          key={uuidv4()}
        />
      ))}
    </div>
  );
};

export default Settings;
