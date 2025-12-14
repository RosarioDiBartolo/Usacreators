import { defineConfig } from "vite";
import react from "@vitejs/plugin-react"; // oppure @vitejs/plugin-react-swc
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { visualizer } from "rollup-plugin-visualizer";
import { sentryVitePlugin } from "@sentry/vite-plugin";

import Inspect from "vite-plugin-inspect";
const isAnalyze = process.env.ANALYZE === "1";

export default defineConfig({
  server: {
    hmr: {
      overlay: true
    }
  },
   build: {
    sourcemap: "hidden", // Source map generation must be turned on ("hidden", true, etc.)
  },
  plugins: [
    sentryVitePlugin({
      org: "miamicreators",
      project: "miamicreators",
      authToken: process.env.SENTRY_AUTH_TOKEN,
      sourcemaps: {
      assets: [".output/**/*"],

         ignore: ["**/node_modules/**"],
       // filesToDeleteAfterUpload: ["./output/**/*.map"],
      },
    }),
    tanstackStart(), // or 'vercel-edge'
    tsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
    nitro(),
    react(),
    tailwindcss(),
    ...(isAnalyze
      ? [Inspect(), visualizer({ filename: "stats.html", gzipSize: true })]
      : []),
  ],
});
