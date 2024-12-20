import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3027,
    open: true,
     // proxy setup to avoid CORS issues on dev server
    proxy: {
      "/graphql": {
        target: "http://localhost:3099",
        secure: false,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/assets/, '/assets'),
      },
    }
  }
})

