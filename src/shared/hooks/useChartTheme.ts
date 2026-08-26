import useTheme from "./useTheme";

const CHART_THEME = {
  light: {
    text: "#52514e",
    muted: "#898781",
    grid: "#e1e0d9",
    surface: "#fcfcfb",
    slot1: "#2a78d6",
    slot2: "#eb6834",
  },
  dark: {
    text: "#c3c2b7",
    muted: "#898781",
    grid: "#2c2c2a",
    surface: "#1a1a19",
    slot1: "#3987e5",
    slot2: "#d95926",
  },
};

const useChartTheme = () => {
  const { __theme } = useTheme();

  return CHART_THEME[__theme];
};

export default useChartTheme;
