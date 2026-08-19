import type { ReactNode } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  children: ReactNode;
}

const Modal = ({ children }: ModalProps) => {
  return createPortal(
    <>
      <div className="modal fade show d-block" tabIndex={-1} role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">{children}</div>
        </div>
      </div>

      <div className="modal-backdrop fade show" />
    </>,
    document.body,
  );
};

export default Modal;
