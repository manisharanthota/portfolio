// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // Emit scripts as files instead of inlining them, so the CSP in vercel.json
  // can use script-src 'self' without 'unsafe-inline'.
  build: {
    inlineStylesheets: 'never',
  },
  vite: {
    build: {
      assetsInlineLimit: 0,
    },
    plugins: [tailwindcss()],
  },
});
