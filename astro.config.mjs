import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://ejhope.org',
  output: 'static',
  build: {
    inlineStylesheets: 'auto'
  },
  vite: {
    css: {
      preprocessorOptions: {}
    }
  }
});
