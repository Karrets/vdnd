import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import inkline from '@inkline/plugin/vite';
import type { UserOptions } from '@inkline/plugin';
import {fileURLToPath} from "node:url";

const inklineConfig: UserOptions = {
  outputDir: 'client/src/css/inkline_css/'
};

const webroot = process.env.WEB_ROOT || '/';

// https://vitejs.dev/config/
export default defineConfig({
  base: webroot,
  root: 'client/',
  plugins: [inkline(inklineConfig), inkline(inklineConfig), vue()],
  resolve: {
    alias: {
      // noinspection
      '@': fileURLToPath(new URL('./client/src', import.meta.url))
    }
  },
  build: {
    outDir: '../dist',
    manifest: true,
    emptyOutDir: true,
    rollupOptions: {
      input: ['./client/src/main.ts']
    }
  }
});
