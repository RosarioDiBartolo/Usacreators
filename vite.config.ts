import { defineConfig } from "vite";
import react from "@vitejs/plugin-react"; // oppure @vitejs/plugin-react-swc
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";
import tailwindcss from "@tailwindcss/vite";
 import tsConfigPaths from 'vite-tsconfig-paths'
import { visualizer } from 'rollup-plugin-visualizer'
import Inspect from 'vite-plugin-inspect'
const isAnalyze = process.env.ANALYZE === '1'

export default defineConfig({
  plugins: [
    tanstackStart(),
    tsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
    nitro({ config: { preset: "node-server" } }),
    react(),
    tailwindcss(),
    ...(isAnalyze ? [Inspect(), visualizer({ filename: 'stats.html', gzipSize: true })] : []),

  ] 
});
