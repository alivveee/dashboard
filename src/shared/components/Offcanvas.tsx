import { useEffect, useRef, type ReactNode, type RefObject } from "react";
import { createPortal } from "react-dom";
import { Offcanvas as BootstrapOffcanvas } from "bootstrap";

export interface OffcanvasHandle {
  show: () => void;
  hide: () => void;
}

interface OffcanvasProps {
  offcanvasRef: RefObject<OffcanvasHandle | null>;
  onClose?: () => void;
  children: ReactNode;
}

const Offcanvas = ({ offcanvasRef, onClose, children }: OffcanvasProps) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const instance = new BootstrapOffcanvas(el, { backdrop: true, scroll: false });
    offcanvasRef.current = {
      show: () => instance.show(),
      hide: () => instance.hide(),
    };

    const handleHidden = () => onCloseRef.current?.();
    el.addEventListener("hidden.bs.offcanvas", handleHidden);

    return () => {
      el.removeEventListener("hidden.bs.offcanvas", handleHidden);
      instance.dispose();
      offcanvasRef.current = null;
    };
  }, [offcanvasRef]);

  return createPortal(
    <div ref={elementRef} className="offcanvas offcanvas-end" tabIndex={-1}>
      {children}
    </div>,
    document.body,
  );
};

export default Offcanvas;
