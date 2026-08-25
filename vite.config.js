import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css','resources/js/app.jsx'],
            refresh: true,
        }),
        react(),
    ],
    resolve: {
        alias: {
            '@': '/resources/js',
        },
    },
    server: {
        host: '192.168.56.1',
        port: 5173,
        cors: {
            origin: '*',
        },
        hmr: {
            host: '192.168.56.1',
            port: 5173,
            protocol: 'http',
        },
        watch: {
            usePolling: false,
            ignored: ['/node_modules/', '/vendor/', '/.git/'],
        },
    },
    optimizeDeps: {
    include: ['@mui/material', '@mui/icons-material']
  },
});