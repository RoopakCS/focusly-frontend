import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import SERVER_URL from './src/SERVER_URL'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/socket.io": {
        target: `https://${SERVER_URL}`,
        ws: true
      }
    }
  }
})
