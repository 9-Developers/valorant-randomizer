import react from "@vitejs/plugin-react";
import { coverageConfigDefaults, defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    coverage: {
      exclude: [
        "*.config.[jt]s",
        "**/env.js",
        ...coverageConfigDefaults.exclude,
      ],
    },
    environment: "jsdom",
    setupFiles: ["setup-test.ts"],
  },
});
