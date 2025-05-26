import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import flowbite from 'flowbite/plugin'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss({
      config: {
        content: [
          './index.html',
          './src/**/*.{js,ts,jsx,tsx}',
          'node_modules/flowbite-react/lib/esm/**/*.js'
        ],
        plugins: [flowbite]
      }
    }),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        secure: false,
      }
    }
  }
})