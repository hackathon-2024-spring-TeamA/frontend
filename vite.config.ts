/// <reference types="vitest" />
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    // globals: true,
    environment: "happy-dom",
    setupFiles: ["./vitest-setup.ts"],
    // スナップショットの保存先を設定
    resolveSnapshotPath: (path, extension) => {
      return path.replace("/src/", "/__snapshots__/") + extension;
    },
  },
});
