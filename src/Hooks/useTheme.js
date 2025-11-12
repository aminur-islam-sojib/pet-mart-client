import { useContext } from "react";
import { ThemeContext } from "../Context/ThemeContext";

const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
};

export default useTheme;
