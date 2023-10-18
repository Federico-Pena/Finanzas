import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      strategies: 'network-first',
      manifest: {
        name: 'Finanzas',
        short_name: 'Finanzas',
        theme_color: '#333333',
        background_color: '#333333',
        display: 'standalone',
        scope: '/',
        start_url: '.',
        lang: 'es',
        icons: [
          {
            src: '/favicon.ico',
            type: 'image/x-icon',
            sizes: '16x16 32x32'
          },
          {
            src: '/icon-192.png',
            type: 'image/png',
            sizes: '192x192'
          },
          {
            src: '/icon-512.png',
            type: 'image/png',
            sizes: '512x512'
          },
          {
            src: '/icon-192-maskable.png',
            type: 'image/png',
            sizes: '192x192',
            purpose: 'maskable'
          },
          {
            src: '/icon-512-maskable.png',
            type: 'image/png',
            sizes: '512x512',
            purpose: 'maskable'
          }
        ]
      }
    })
  ]
})
