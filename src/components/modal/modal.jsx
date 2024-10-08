import React from "react";
import "./style.css"; // Ensure the styles are included
import { VscChromeClose } from "react-icons/vsc";

const Modal = ({ isOpen, onClose, title, footer, children }) => {
  return (
    <div
      className={`modal_nav ${isOpen ? "modal__opened" : ""}`}
      style={{ zIndex: 9999 }}
    >
      <div className="bg__modal">
        <div className="modal__wrapper">
          <div className="p-3">
            <div className="modal__header">
              <h5 className="modal__header_item my-2">{title}</h5>
              <button className="modal__close-button" onClick={onClose}>
                <VscChromeClose />
              </button>
            </div>
            {children}
          </div>
        </div>
        <div className="menu_footer d-flex flex-column flex-md-row justify-content-between align-items-md-center position-absolute w-100 p-3">
          <div className="d-flex">{footer}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
