import { createLocalStorageState } from "../hooks";
import { z } from "zod";


export const themeSchema = z.union([
  z.literal("dark"),
  z.literal("light")
]);

export type Theme = z.infer<typeof themeSchema>;

export const useThemeState = createLocalStorageState<Theme>({
  key: "theme",
  fallback: "dark",
  parse: (value): Theme => {
    return themeSchema.parse(value);
  }
});