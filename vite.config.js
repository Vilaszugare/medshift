import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: './', // <--- THIS IS THE MAGIC LINE FOR ANDROID
  build: { outDir: "dist" },
  server: {
    host: true,
    allowedHosts: ['https://medmis.vercel.app/', 'lics-fry.loca.lt']
  },
  plugins: [
    react(),
    tailwindcss(),
  ],
})