import { defineConfig } from 'astro/config';

import node from '@astrojs/node';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';
import swup from '@swup/astro';

import { getSiteURL } from './src/scripts/url';

export default defineConfig({
  site: getSiteURL(),

  image: {
    remotePatterns: [
      { protocol: 'https', hostname: '*.alexlebens.net' },
      { protocol: 'https', hostname: '*.jsdelivr.net' },
      { protocol: 'https', hostname: '*.icons8.com' },
    ],
    service: {
      entrypoint: 'astro/assets/services/sharp',
    }
  },

  integrations: [
    react(),
    sitemap(),
    icon({
      include: {
        mdi: ['*'],
      },
    }),
    swup({
      theme: 'fade',
      native: true,
      cache: true,
      preload: true,
      accessibility: true,
      smoothScrolling: true,
      morph: ['#nav'],
    }),
    (await import('@playform/compress')).default({
      CSS: true,
      JavaScript: false,
      HTML: {
        'html-minifier-terser': {
          collapseWhitespace: true,
          minifyCSS: false,
          minifyJS: false,
        },
      },
      Image: false,
      SVG: true,
    }),
  ],

  markdown: {
    syntaxHighlight: false,
  },

  plugins: {
    '@tailwindcss/postcss': {},
  },

  vite: {
    plugins: [tailwindcss()],
  },

  output: 'static',

  adapter: node({
    mode: 'standalone',
  }),
});
