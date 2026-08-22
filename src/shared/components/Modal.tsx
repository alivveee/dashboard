import { useEffect, useRef, type ReactNode, type RefObject } from "react";
import { createPortal } from "react-dom";
import { Modal as BootstrapModal } from "bootstrap";

export interface ModalHandle {
  show: () => void;
  hide: () => void;
}

interface ModalProps {
  modalRef: RefObject<ModalHandle | null>;
  onClose?: () => void;
  children: ReactNode;
}

const Modal = ({ modalRef, onClose, children }: ModalProps) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);

  onCloseRef.current = onClose;

  useEffect(() => {
    const element = elementRef.current;

    if (!element) return;

    const instance = new BootstrapModal(element);

    modalRef.current = {
      show: () => instance.show(),
      hide: () => instance.hide(),
    };

    const handleHidden = () => onCloseRef.current?.();

    element.addEventListener("hidden.bs.modal", handleHidden);

    return () => {
      element.removeEventListener("hidden.bs.modal", handleHidden);
      instance.dispose();
      modalRef.current = null;
    };
  }, [modalRef]);

  return createPortal(
    <div ref={elementRef} className="modal fade" tabIndex={-1} role="dialog">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">{children}</div>
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
