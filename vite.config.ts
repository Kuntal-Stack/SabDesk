// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // ✅ Required to enable popup correctly
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
