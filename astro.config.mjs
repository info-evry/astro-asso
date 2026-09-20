import { defineConfig } from 'astro/config';
import sfSymbols from '@info-evry/astro-design/integrations/sf-symbols';

export default defineConfig({
  output: 'static',
  integrations: [sfSymbols()],
  compressHTML: true,
  vite: {
    build: {
      minify: 'esbuild',
      cssMinify: true,
      rollupOptions: {
        output: {
          manualChunks: undefined
        }
      }
    }
  }
});
