import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
  plugins: [
    react(),
    nodePolyfills(),
  ],
  resolve: {
    alias: {
      path: 'path-browserify',
      process: 'process/browser',
      stream: 'stream-browserify',
      util: 'util/',
      assert: 'assert/',
    },
  },
});
