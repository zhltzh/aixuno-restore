import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';

const pages = [
  'index',
  'about',
  'contact',
  'changelog',
  'privacy',
  'terms',
  'disclaimer',
  'guides/index',
  'guides/restore-faded-family-photos',
  'guides/scratch-and-dust-repair',
  'guides/ai-restore-vs-local-fix',
  'guides/phone-photo-restore-tips',
];

const all = [...pages, ...pages.map((p) => `zh/${p}`)];

export default defineConfig({
  build: {
    target: 'es2020',
    assetsInlineLimit: 0,
    rollupOptions: {
      input: Object.fromEntries(
        all.map((p) => [p.replace(/\//g, '-'), fileURLToPath(new URL(`./${p}.html`, import.meta.url))])
      ),
    },
  },
  server: {
    host: '127.0.0.1',
    port: 5175,
    proxy: {
      '/api': { target: 'http://127.0.0.1:8080', changeOrigin: true },
    },
  },
});
