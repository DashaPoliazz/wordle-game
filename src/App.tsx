import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import "./styles/styles.css";
import { Game } from "./components/game/Game";
import ReactConfetti from "react-confetti";
import Modal from "./components/modal/Modal";
import { useAppSelector } from "./hooks/useAppSelector";
import { useActions } from "./hooks/useActions";
import Settings from "./components/settings/Settings";
import { useWindowSize } from "./hooks/useWindowSize";

function App() {
  const { width, height } = useWindowSize();
  const { isModal } = useAppSelector((state) => state.modal);
  const { toggleModal } = useActions();
  const [win, setWin] = useState(false);

  return (
    <div className="container">
      {win && <ReactConfetti tweenDuration={5000} recycle={false} />}
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
      <Game win={win} onWin={setWin} />
    </div>
  );
}

export default App;
