import React, { useEffect } from "react";

const Modal = ({ show, onClose, title, children }) => {
  const closeOnEsc = (event) => {
    if ((event.charCode || event.keyCode) === 27) {
      onClose();
    }
  };

  useEffect(() => {
    document.body.addEventListener("keydown", closeOnEsc);
    return function cleanup() {
      document.body.removeEventListener("keydown", closeOnEsc);
    };
  }, []);

  if (!show) {
    return null;
  }

  return (
    <div
      className="modal fixed left-0 top-0 right-0 bottom-0 flex items-center justify-center bg-white bg-opacity-25"
      onClick={onClose}
    >
      <div
        className="editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl w-1/2 bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header p-2">
          <h4 className="text-2xl font-bold mb-4 modal-title ">{title}</h4>
        </div>

        <div className="modal-body p-2">{children}</div>
        <div className="modal-footer p-2 flex justify-end">
          <div>
            <button
              onClick={onClose}
              className="btn border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 ml-auto"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
