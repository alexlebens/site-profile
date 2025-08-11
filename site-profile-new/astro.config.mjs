import { defineConfig, passthroughImageService, sharpImageService } from 'astro/config';

import mdx from '@astrojs/mdx';
import node from '@astrojs/node';
import partytown from '@astrojs/partytown';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';
import swup from '@swup/astro';
import rehypePrettyCode from 'rehype-pretty-code';
import { transformerCopyButton } from '@rehype-pretty/transformers';

const getSiteURL = () => {
  if (process.env.SITE_URL) {
    return `https://${process.env.SITE_URL}`;
  }
  return 'http://localhost:4321';
};

export default defineConfig({
  site: getSiteURL(),

  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    }
  },

  prefetch: true,

  integrations: [
    mdx(),
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
    rehypePlugins: [
      [
        rehypePrettyCode,
        {
          theme: {
            light: 'github-light',
            dark: 'github-dark-dimmed',
          },
          keepBackground: false,
          transformers: [
            transformerCopyButton({
              visibility: 'always',
              feedbackDuration: 2500,
            }),
          ],
        },
      ],
    ],
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
