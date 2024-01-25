import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import "./styles/styles.css";
import { Game } from "./components/game/Game";
import ReactConfetti from "react-confetti";
import Modal from "./components/modal/Modal";
import { useAppSelector } from "./hooks/useAppSelector";
import { useActions } from "./hooks/useActions";
import Settings from "./components/settings/Settings";
import Guidance from "./components/guidance/Guidance";

function App() {
  const { isModal } = useAppSelector((state) => state.modal);
  const { toggleModal } = useActions();
  const [isSettingsModal, setIsSettingsModal] = useState(false);
  const [isGuidanceModal, setIsGuidanceModal] = useState(false);
  const [win, setWin] = useState(false);

  const toggleSettingsModal = () => {
    toggleModal();
    setIsSettingsModal(!isSettingsModal);
  };
  const toggleGuidanceModal = () => {
    toggleModal();
    setIsGuidanceModal(!isGuidanceModal);
  };

  return (
    <div className="container">
      {win && <ReactConfetti tweenDuration={5000} recycle={false} />}
      <header className="header">
        <div className="header__left"></div>
        <div className="header__right">
          <button
            className="header__button"
            onClick={() => toggleSettingsModal()}
          >
            Settings
          </button>
          <button
            className="header__button"
            onClick={() => toggleGuidanceModal()}
          >
            How to
          </button>
        </div>
      </header>
      {isModal &&
        isSettingsModal &&
        createPortal(
          <Modal title={"Settings"} children={<Settings />} />,
          document.body
        )}
      {isModal &&
        isGuidanceModal &&
        createPortal(
          <Modal title={"How to play"} children={<Guidance />} />,
          document.body
        )}
      <Game win={win} onWin={setWin} />
    </div>
  );
}

export default App;
