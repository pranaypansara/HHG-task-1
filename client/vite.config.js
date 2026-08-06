import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    // In development, forward API / share routes to the backend so the client
    // can always use relative paths (works identically in production).
    proxy: {
      '/api': 'http://localhost:5000',
      '/card': 'http://localhost:5000',
      '/generated': 'http://localhost:5000',
    },
  },
})
