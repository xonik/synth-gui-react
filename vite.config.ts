/// <reference types="vitest" />

import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
    base: '/synth-gui-react/',
    plugins: [
        react(),
        {
            name: 'redirect-base-path',
            configureServer(server) {
                // Register directly so it runs BEFORE Vite's internal middleware
                server.middlewares.use((req, res, next) => {
                    const url = req.url || ''
                    if (url === '/synth-gui-react' || url.startsWith('/synth-gui-react?')) {
                        res.writeHead(301, { Location: '/synth-gui-react/' })
                        res.end()
                        return
                    }
                    next()
                })
            },
        },
    ],
    server: {
        port: 3000,
        proxy: {
            '/api': {
                target: 'http://localhost:3001',
                changeOrigin: true,
            },
        },
    },
    build: {
        outDir: 'dist',
        sourcemap: true,
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    test: {
        globals: true,
        environment: 'node',
    },
})
