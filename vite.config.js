import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    fs: {
      allow: [
        'C:/Users/Hp/Desktop/r&g',
        'C:/Users/Hp/.gemini/antigravity-ide/brain'
      ]
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: false
  }
});
