import { defineConfig } from "vite";
import React from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [React(), tsconfigPaths()],
});
