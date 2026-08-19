import { create } from "zustand";

export type Theme = "light" | "dark";

const THEME_KEY = "gx-theme";

const getInitialTheme = (): Theme => {
  const stored = localStorage.getItem(THEME_KEY);

  return stored === "dark" || stored === "light" ? stored : "light";
};

interface ThemeState {
  theme: Theme;
  toggle: () => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: getInitialTheme(),

  toggle: () =>
    set((state) => {
      const theme: Theme = state.theme === "light" ? "dark" : "light";

      localStorage.setItem(THEME_KEY, theme);

      return { theme };
    }),
}));

window.addEventListener("storage", ({ key, newValue }) => {
  if (key === THEME_KEY) {
    useThemeStore.setState({
      theme: newValue === "dark" ? "dark" : "light",
    });
  }
});
