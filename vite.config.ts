import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

// On GitHub Actions the site is served from /Under_the_Stars/.
// Locally (and on Netlify/Vercel) it is served from the root.
export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? '/Under_the_Stars/' : '/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
})
