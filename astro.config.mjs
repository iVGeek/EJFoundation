import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://ejhopefoundation.org',
  output: 'static',
  build: {
    inlineStylesheets: 'auto'
  }
});
