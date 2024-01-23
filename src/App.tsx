import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import "./styles.css";
import { Game } from "./components/game/Game";
import Modal from "./components/modal/Modal";
import { useAppSelector } from "./hooks/useAppSelector";
import { useActions } from "./hooks/useActions";
import { fetchRandomWord } from "./utils/fetchRandomWord";
import Settings from "./components/settings/Settings";

function App() {
  const [randomWord, setRandomWord] = useState("");

  const { isModal } = useAppSelector((state) => state.modal);
  const { wordLength } = useAppSelector((state) => state.settings);
  const { toggleModal } = useActions();

  useEffect(() => {
    fetchRandomWord(wordLength).then(setRandomWord);
  }, [wordLength]);

  return (
    <div className="container">
      <header className="header">
        <div className="header__left"></div>
        <div className="header__right">
          <button className="header__button" onClick={() => toggleModal()}>
            Settings
          </button>
        </div>
      </header>
      {isModal &&
        createPortal(<Modal children={<Settings />} />, document.body)}
      <Game secretWord={randomWord} />
    </div>
  );
}

export default App;
