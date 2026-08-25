interface BootstrapPanelInstance {
  show: () => void;
  hide: () => void;
  dispose: () => void;
}

export interface PanelHandle {
  show: () => void;
  hide: () => void;
}

interface SetupBootstrapPanelOptions<T extends BootstrapPanelInstance> {
  element: HTMLElement;
  eventNamespace: "offcanvas" | "modal";
  onClose: () => void;
  closable: boolean;
  createInstance: (
    element: HTMLElement,
    config: { backdrop: boolean | "static"; keyboard: boolean },
  ) => T;
}

export const setupBootstrapPanel = <T extends BootstrapPanelInstance>({
  element,
  eventNamespace,
  onClose,
  closable,
  createInstance,
}: SetupBootstrapPanelOptions<T>): { handle: PanelHandle; teardown: () => void } => {
  const instance = createInstance(element, {
    backdrop: closable ? true : "static",
    keyboard: closable,
  });

  const hiddenEvent = `hidden.bs.${eventNamespace}`;
  const handleHidden = () => onClose();
  element.addEventListener(hiddenEvent, handleHidden);

  return {
    handle: {
      show: () => instance.show(),
      hide: () => instance.hide(),
    },
    teardown: () => {
      element.removeEventListener(hiddenEvent, handleHidden);
      instance.dispose();
    },
  };
};
