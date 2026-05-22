import { defineConfig, fontProviders } from 'astro/config';

import node from '@astrojs/node';
import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';
import swup from '@swup/astro';

import { getSiteURL } from './src/scripts/url';

export default defineConfig({
  site: getSiteURL(),

  image: {
    dangerouslyProcessSVG: true,
    remotePatterns: [
      { protocol: 'https', hostname: '*.alexlebens.net' },
      { protocol: 'https', hostname: '*.jsdelivr.net' },
      { protocol: 'https', hostname: '*.icons8.com' },
    ],
    service: {
      entrypoint: 'astro/assets/services/sharp',
    }
  },

  prefetch: true,

  integrations: [
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
          minifyCSS: true,
          minifyJS: true,
        },
      },
      Image: false,
      SVG: true,
    }),
  ],

  fonts: [{
    provider: fontProviders.fontsource(),
    name: "Fredoka",
    cssVariable: "--font-base",
  }],

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
