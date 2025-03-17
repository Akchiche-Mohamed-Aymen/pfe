import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react() , tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'https://huggingface.co',  // Backend URL
        changeOrigin: true,               // Changes the origin to bypass CORS
        secure: false,                    // Ignore HTTPS certificate issues (only for dev)
        rewrite: (path) => path.replace(/^\/api/, '') // Remove /api from requests
      }
    }
  }
})
