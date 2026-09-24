import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  css: {
    postcss: {},
  },
  build: {
    // Keep CSS working on older Safari (macOS Catalina/Big Sur ship Safari
    // 15), Chrome/Edge and Firefox: the minifier then keeps our fallbacks for
    // color-mix() and container units, and adds any -webkit- prefixes needed.
    cssTarget: ['chrome100', 'edge100', 'firefox100', 'safari15', 'ios15'],
  },
  // Allow Cloudflare quick-tunnel links (https://*.trycloudflare.com) for sharing
  server: {
    allowedHosts: ['.trycloudflare.com'],
  },
  preview: {
    allowedHosts: ['.trycloudflare.com'],
  },
})
