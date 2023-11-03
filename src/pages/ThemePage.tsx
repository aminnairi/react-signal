import { Fragment, useCallback } from "react";
import { useSignal } from "../hooks";
import { themeSignal } from "../signals/theme";

export const ThemePage = () => {
  const [theme, setTheme] = useSignal(themeSignal);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "light" ? "dark" : "light");
  }, [setTheme, theme]);

  const reset = useCallback(() => {
    themeSignal.remove();
  }, []);

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