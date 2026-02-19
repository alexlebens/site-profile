import { defineConfig } from 'astro/config';

import node from '@astrojs/node';
import partytown from '@astrojs/partytown';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';
import swup from '@swup/astro';

import { getSiteURL } from './src/support/url';

export default defineConfig({
  site: getSiteURL(),

  image: {
    remotePatterns: [
      { protocol: 'https', hostname: '*.alexlebens.net' },
      { protocol: 'https', hostname: '*.jsdelivr.net' },
    ],
    service: {
      entrypoint: 'astro/assets/services/sharp',
    }
  },

  prefetch: true,

  integrations: [
    partytown(),
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
      JavaScript: true,
      HTML: {
        'html-minifier-terser': {
          collapseWhitespace: true,
          minifyCSS: false,
          minifyJS: true,
        },
      },
      Image: false,
      SVG: true,
      Logger: 2,
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

  build: {
    // Specifies the directory in the build output where Astro-generated assets (bundled JS and CSS for example) should live.
    // see https://docs.astro.build/en/reference/configuration-reference/#buildassets
    assets: 'assets',
    // see https://docs.astro.build/en/reference/configuration-reference/#buildassetsprefix
    assetsPrefix:
      !!import.meta.env.S3_ENABLE || !!process.env.S3_ENABLE ? 'https://digitalocean.com' : '',
  },
});
