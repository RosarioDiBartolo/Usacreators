import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // oppure @vitejs/plugin-react-swc
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import { nitroV2Plugin } from '@tanstack/nitro-v2-vite-plugin'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
   
  plugins: [tanstackStart(), nitroV2Plugin(), react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
     },
  },
})
