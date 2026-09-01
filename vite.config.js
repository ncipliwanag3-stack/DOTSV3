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
        host: '172.17.5.123',
        port: 5173,
        cors: {
            origin: '*',
        },
        hmr: {
            host: '172.17.5.123',
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