import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import { scanReceiptWithGemini } from './api/receiptScanner.js'

/* global process */

const localReceiptApi = (env) => ({
  name: 'local-receipt-api',
  configureServer(server) {
    server.middlewares.use('/api/scan-receipt', async (req, res) => {
      if (req.method !== 'POST') {
        res.statusCode = 405
        return res.end(JSON.stringify({ error: 'Método no permitido' }))
      }

      let rawBody = ''
      req.on('data', chunk => { rawBody += chunk })
      req.on('end', async () => {
        res.setHeader('Content-Type', 'application/json')
        try {
          const { image } = JSON.parse(rawBody)
          const result = await scanReceiptWithGemini(image, env.GEMINI_API_KEY, env.GEMINI_MODEL)
          res.statusCode = 200
          res.end(JSON.stringify(result))
        } catch (error) {
          console.error('Local receipt scan error', error)
          res.statusCode = 502
          res.end(JSON.stringify({ error: error.message || 'No se pudo analizar el ticket.' }))
        }
      })
    })
  }
})

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [
    react(),
    localReceiptApi(env),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        id: "/",
        name: "DivideApp",
        short_name: "DivideApp",
        description: "Reparte una cuenta entre varias personas de forma sencilla.",
        lang: "es",
        start_url: "/",
        scope: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#4caf50",
        icons: [
          {
            src: "/divideapp-icon.svg",
            sizes: "any",
            type: "image/svg+xml",
            purpose: "any"
          },
          {
            src: "/divideapp-icon-192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any"
          },
          {
            src: "/divideapp-icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any"
          }
        ]
      }
    })
    ]
  }
})
