import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
// The backend URL is configured per environment via VITE_API_URL
// (see client/.env.production and client/.env.development).
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})