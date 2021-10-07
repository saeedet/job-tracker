import React from "react";
import { createPortal } from "react-dom";

interface Props {
  displayInput: boolean;
  setDisplayInput: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal: React.FC<Props> = ({
  children,
  displayInput,
  setDisplayInput,
}) => {
  if (!displayInput) {
    return null;
  }

  const myElement: HTMLElement = document.getElementById("portal");
  return createPortal(
    <>
      <div
        className="modal__backdrop"
        onClick={() => setDisplayInput(false)}
      ></div>
      <div>{children}</div>
    </>,
    myElement
  );
};

export default Modal;
