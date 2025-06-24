import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";


// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src")   //  ❗️ key line
    }
  },
  server: {
    host: true,
  },
  build: {
    sourcemap: mode === "development",
  },
  base: "./",
}));
