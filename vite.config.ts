import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // oppure @vitejs/plugin-react-swc
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import { nitro } from 'nitro/vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [tanstackStart(), nitro(), react(), tailwindcss()],
})
