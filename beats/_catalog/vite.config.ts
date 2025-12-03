import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: '/thtx-knowledge-bank/catalog/',
  build: {
    outDir: 'dist',
  },
  server: {
    port: 3001,
  },
  resolve: {
    alias: {
      '@thtx/shared': path.resolve(__dirname, '../_shared'),
      // Ensure shared components resolve dependencies from catalog's node_modules
      'react': path.resolve(__dirname, 'node_modules/react'),
      'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
      'lucide-react': path.resolve(__dirname, 'node_modules/lucide-react'),
    },
  },
});
