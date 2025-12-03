import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  root: __dirname,
  build: {
    outDir: 'dist',
  },
  server: {
    port: 3003,
    proxy: {
      '/api': {
        target: 'http://localhost:3002',
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@thtx/shared': path.resolve(__dirname, '../../_shared'),
      'react': path.resolve(__dirname, '../node_modules/react'),
      'react-dom': path.resolve(__dirname, '../node_modules/react-dom'),
      'lucide-react': path.resolve(__dirname, '../node_modules/lucide-react'),
    },
  },
});
