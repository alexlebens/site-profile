import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

import node from '@astrojs/node';

const getSiteURL = () => {
  if (process.env.SITE_URL) {
    return `https://${process.env.SITE_URL}`;
  }
  return 'http://localhost:4321';
};

export default defineConfig({
  site: getSiteURL(),
  integrations: [tailwindcss(), react()],

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
