import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      jsxImportSource: '@emotion/react', // Penting untuk Chakra UI v3
      babel: {
        plugins: ['@emotion'], // Dukung Emotion
      },
    }),
  ],
  resolve: {
    alias: {
      '@': '/src', // Opsional, untuk memudahkan impor
    },
  },
});