// @ts-check

import { bytecodePlugin } from 'electron-vite';
import { defineConfig } from 'electron-vite';
import path from 'node:path';

export default defineConfig({
  main: {
    build: {
      lib: {
        entry: './main/index.ts',
        formats: ['cjs'],
      },
      outDir: 'dist/main',
      minify: true,
      rollupOptions: {
        external: [
          'asdf-overlay-node',
          '@jellybrick/wql-process-monitor',
          'find-process',
        ],
      },
    },
    plugins: [bytecodePlugin()],
    resolve: {
      alias: {
        '@asset': path.resolve('./asset'),
      },
    },
    assetsInclude: ['./asset/*'],
  },
});
