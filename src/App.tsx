import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import "./styles.css";
import { fetchRandomWord } from "./utils/fetchRandomWord";
import { Game } from "./components/game/Game";
import Settings from "./components/settings/Settings";
import { IConfigOption } from "./types/MessageType";
import { DEFAULT_OPTIONS } from "./utils/defaultOptions";
import Modal from "./components/modal/Modal";

const DEFAULT_SECRET_WORD_LENGTH = 6;

// Todo:
//  (maybe take redux?)
// Should app component know smth about settings?
// [ ] 1. Unify config (add ability to add another settings);
// [ ] 2. Move 'wordLength' to config;

function App() {
  const [isModal, setIsModal] = useState(true);
  const [secretWord, setSecretWord] = useState("");
  const [wordLength, setWordLength] = useState(DEFAULT_SECRET_WORD_LENGTH);
  const [config, setConfig] = useState<IConfigOption[]>(DEFAULT_OPTIONS);

  const handleConfigChange = (title: string) => {
    setConfig((prevOptions) => {
      return prevOptions.map((option) => {
        return option.title === title
          ? { ...option, isChecked: !option.isChecked }
          : option;
      });
    });
  };
  const handleWordLengthChange = (len: number) => setWordLength(len);

  useEffect(() => {
    fetchRandomWord(wordLength).then(setSecretWord);
  }, [wordLength]);

  const settingsComponent = () => (
    <Settings
      onConfigChange={handleConfigChange}
      options={config}
      wordLength={wordLength}
      onWordLengthChange={handleWordLengthChange}
    />
  );

  return (
    <div className="container">
      {isModal &&
        createPortal(<Modal children={settingsComponent()} />, document.body)}
      <Game secretWord={secretWord} />
    </div>
  );
}

export default App;
