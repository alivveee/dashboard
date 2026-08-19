import { useSidebarStore } from "../stores/useSidebarStore";

const useSidebar = () => {
  const isOpen = useSidebarStore((state) => state.isOpen);
  const toggle = useSidebarStore((state) => state.toggle);

  return {
    isOpen,
    toggle,
  };
};

export default useSidebar;
