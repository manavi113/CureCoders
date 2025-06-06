 
 
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
   plugins: [react()],
  resolve: {
    alias: {
      stream: 'stream-browserify',
      buffer: 'buffer',
      process: 'process/browser',
      crypto: 'crypto-browserify', // ✅ Add this line
    },
  },
  define: {
    global: 'globalThis', // ✅ Required by simple-peer
  },
  server: {    host: true,  
  
 port: 5173, // Frontend port
     proxy: {
       "/api": {
         target: "http://localhost:3001", // ✅ Correct backend URL
         changeOrigin: true,
         secure: false,
       },
     },
  },
});
 
