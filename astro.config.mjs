import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

const getSiteURL = () => {
  if (process.env.SITE_URL) {
    return `https://${process.env.SITE_URL}`;
  }
  return 'http://localhost:4321';
};

export default defineConfig({
  site: getSiteURL(),
  integrations: [
    tailwind(),
    react(),
  ],
});
