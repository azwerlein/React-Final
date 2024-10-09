import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "https://azwerlein.github.io/React-Final/",
  plugins: [react()],
});
