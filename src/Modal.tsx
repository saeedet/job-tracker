import React from "react";
import { createPortal } from "react-dom";
import { useContextProvider } from "./context/StateProvider";

interface Props {
  children: React.ReactNode;
  show: boolean;
}

const Modal: React.FC<Props> = ({ children, show }) => {
  const [{ _ }, dispatch] = useContextProvider();

  if (!show) {
    return null;
  }

  //modal backdrop click handler for closing the modal
  const closeModal = () => {
    dispatch({
      type: "displayInput",
      payload: false,
    });
    dispatch({
      type: "displayDetails",
      payload: false,
    });
  };

  const myElement: HTMLElement = document.getElementById("portal");
  return createPortal(
    <>
      <div className="modal__backdrop" onClick={closeModal}></div>
      <div>{children}</div>
    </>,
    myElement
  );
};

export default Modal;
