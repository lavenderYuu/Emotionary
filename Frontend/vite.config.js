import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: true, // Add this line
    port: 5174,
    strictPort: true,
  },
  plugins: [react()],
})
