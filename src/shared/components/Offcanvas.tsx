import { useEffect, useRef, type ReactNode, type RefObject } from "react";
import { createPortal } from "react-dom";
import { Offcanvas as BootstrapOffcanvas } from "bootstrap";
import { setupBootstrapPanel, type PanelHandle } from "../helpers/bootstrapPanel";

export type OffcanvasHandle = PanelHandle;

interface OffcanvasProps {
  offcanvasRef: RefObject<OffcanvasHandle | null>;
  onClose?: () => void;
  closable?: boolean;
  children: ReactNode;
}

const Offcanvas = ({
  offcanvasRef,
  onClose,
  closable = false,
  children,
}: OffcanvasProps) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const { handle, teardown } = setupBootstrapPanel({
      element: el,
      eventNamespace: "offcanvas",
      onClose: () => onCloseRef.current?.(),
      closable,
      createInstance: (element, config) =>
        new BootstrapOffcanvas(element, { ...config, scroll: false }),
    });
    offcanvasRef.current = handle;

    return () => {
      teardown();
      offcanvasRef.current = null;
    };
  }, [offcanvasRef, closable]);

  return createPortal(
    <div ref={elementRef} className="offcanvas offcanvas-end" tabIndex={-1}>
      {children}
    </div>,
    document.body,
  );
};

export default Offcanvas;
