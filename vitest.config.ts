import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    exclude: ["**/node_modules/**", "**/out/**", "**/.next/**"],
    coverage: {
      exclude: [
        "**/node_modules/**",
        "**/out/**",
        "**/.next/**",
        "**/*.config.*",
        "**/vitest.setup.ts",
      ],
    },
  },
});
