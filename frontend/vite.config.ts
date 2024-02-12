/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    host: true,
    port: parseInt(process.env.VITE_PORT) || null,
  },
  server: {
    proxy: {
      "/api": { target: "http://localhost:3000", changeOrigin: true },
    },
  },
  test: {
    environment: "happy-dom",
    reporters: ["default", "json"],
    outputFile: {
      json: "./coverage/rawResults.json",
    },
    coverage: {
      provider: "istanbul",
      reporter: ["text-summary", "lcov"],
      reportsDirectory: "coverage",
      reportOnFailure: true,
    },
  },
});
