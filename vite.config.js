import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true,
    allowedHosts: ['thakare.duckdns.org', 'lics-fry.loca.lt']
  },
  plugins: [
    react(),
    tailwindcss(),
  ],
})
