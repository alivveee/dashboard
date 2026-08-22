import type { RefObject } from "react";
import type { ModalHandle } from "../components/Modal";

export const createModalControls = (ref: RefObject<ModalHandle | null>) => ({
  ref,
  open: () => ref.current?.show(),
  close: () => ref.current?.hide(),
});
