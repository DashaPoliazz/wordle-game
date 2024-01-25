import React, { ReactNode, useEffect, useRef } from "react";
import "./modal.css";

type Props = {
  children: ReactNode;
  title: string;
};

const Modal = ({ children, title }: Props) => {
  return (
    <div className="modal">
      <p className="modal__title">{title}</p>
      <div className="modal__content">{children}</div>
    </div>
  );
};

export default Modal;
