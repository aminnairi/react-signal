import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser"
import { defineConfig } from "rollup";

export default defineConfig({
  input: "src/hooks/index.ts",
  external: [
    "react"
  ],
  plugins: [
    typescript(),
    terser()
  ],
  output: {
    file: "dist/index.js",
    format: "esm"
  }
});