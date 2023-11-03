import { LocalStorageSignal } from "../hooks";

export type Theme = "light" | "dark"

export const themeSignal = new LocalStorageSignal<Theme>({
  key: "theme", 
  value: "dark",
  validation: (value): value is Theme => {
    return value === "dark" || value === "light"
  }
});