import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Pour GitHub Pages : remplace '/' par '/nom-du-repo/' si nécessaire
export default defineConfig({
  base: '/',
  plugins: [
    tailwindcss(),
    react(),
  ],
})
