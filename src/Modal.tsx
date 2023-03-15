import React from "react";
import { createPortal } from "react-dom";
import { displayDetails, setDisplayInput } from "./context/reducer";
import { useContextProvider } from "./context/StateProvider";

interface Props {
  children: React.ReactNode;
  show: boolean;
}

const Modal: React.FC<Props> = ({ children, show }) => {
  // eslint-disable-next-line no-empty-pattern
  const [{}, dispatch] = useContextProvider();

  if (!show) {
    return null;
  }

  //modal backdrop click handler for closing the modal
  const closeModal = () => {
    dispatch(setDisplayInput(false));
    dispatch(displayDetails(false));
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
