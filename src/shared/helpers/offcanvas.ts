import type { RefObject } from "react";
import type { OffcanvasHandle } from "../components/Offcanvas";

export const createOffcanvasControls = (
  ref: RefObject<OffcanvasHandle | null>,
) => ({
  ref,
  open: () => ref.current?.show(),
  close: () => ref.current?.hide(),
});
