import React, { ReactNode } from "react";
import "./modal.css";

type Props = {
  children: ReactNode;
};

const Modal = ({ children }: Props) => {
  return (
    <div className="modal">
      <p className="message">Settings</p>
      <div className="modal__content">{children}</div>
      <div className="options">
        <button className="btn">Yes</button>
        <button className="btn">No</button>
      </div>
    </div>
  );
};

export default Modal;
