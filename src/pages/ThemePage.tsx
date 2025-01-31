import { Fragment, useCallback } from "react";
import { useThemeState } from "../state/theme";

export const ThemePage = () => {
  const [theme, setTheme, removeTheme] = useThemeState();

  const toggleTheme = useCallback(() => {
    setTheme(oldTheme => oldTheme === "light" ? "dark" : "light");
  }, [setTheme]);

  const reset = useCallback(() => {
    removeTheme();
  }, [removeTheme]);

  return (
    <Fragment>
      <button onClick={toggleTheme}>
        Toggle theme ({theme})
      </button>
      <button onClick={reset}>
        Clear
      </button>
    </Fragment>
  );
}