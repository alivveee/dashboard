import { useSidebarStore } from "../stores/useSidebarStore";

const useSidebar = () => {
  const isOpen = useSidebarStore((state) => state.isOpen);
  const toggle = useSidebarStore((state) => state.toggle);
  const close = useSidebarStore((state) => state.close);

  return {
    __isOpen: isOpen,
    __toggle: toggle,
    __close: close,
  };
};

export default useSidebar;
