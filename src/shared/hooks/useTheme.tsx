import { useThemeStore } from "../stores/useThemeStore";

const useTheme = () => {
  const theme = useThemeStore((state) => state.theme);
  const toggle = useThemeStore((state) => state.toggle);

  return {
    __theme: theme,
    __toggle: toggle,
  };
};

export default useTheme;
