import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      // 'autoUpdate' means: when you deploy a new version, users get it automatically
      // without needing to manually refresh. The service worker handles this silently.
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
      manifest: {
        name: 'limina planner',
        short_name: 'limina',
        description: 'your threshold, your rhythm',
        theme_color: '#4A9FC4',
        background_color: '#F2EDE4',
        display: 'standalone',    // hides the browser chrome when installed to home screen
        orientation: 'portrait',
        start_url: '/',
        icons: [
          {
            src: 'favicon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any maskable',
          },
        ],
      },
      workbox: {
        // Cache all these file types so the app loads offline
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
      },
      devOptions: {
        // Lets us test PWA behavior in dev mode (normally only active in production builds)
        enabled: true,
      },
    }),
  ],
})
