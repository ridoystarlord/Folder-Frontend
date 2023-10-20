import React from "react";

type Props = {
  show: boolean;
  children: React.ReactNode;
  handleClose: (e: React.MouseEvent<HTMLElement>) => void;
};

export const Modal = ({ show, children, handleClose }: Props) => {
  return (
    <div>
      <div className="modal" style={{ display: show ? "block" : "none" }}>
        <div className="modal-content">
          <span className="close" onClick={handleClose}>
            &times;
          </span>
          {children}
        </div>
      </div>
    </div>
  );
};
