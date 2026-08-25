import { useEffect, useRef, type ReactNode, type RefObject } from "react";
import { createPortal } from "react-dom";
import { Modal as BootstrapModal } from "bootstrap";
import { setupBootstrapPanel, type PanelHandle } from "../helpers/bootstrapPanel";

export type ModalHandle = PanelHandle;

interface ModalProps {
  modalRef: RefObject<ModalHandle | null>;
  onClose?: () => void;
  closable?: boolean;
  children: ReactNode;
}

const Modal = ({ modalRef, onClose, closable = false, children }: ModalProps) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const { handle, teardown } = setupBootstrapPanel({
      element,
      eventNamespace: "modal",
      onClose: () => onCloseRef.current?.(),
      closable,
      createInstance: (el, config) => new BootstrapModal(el, config),
    });
    modalRef.current = handle;

    return () => {
      teardown();
      modalRef.current = null;
    };
  }, [modalRef, closable]);

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
