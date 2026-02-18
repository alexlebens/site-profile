import { readSingleton } from '@directus/sdk';

import directus from '@lib/directus';

export interface NavigationLink {
  name: string;
  url: string;
}

const global = await directus.request(readSingleton('site_global'));

export const NavigationLinks: NavigationLink[] = [
  { name: 'Home', url: '/' },
  { name: 'Blog', url: '/blog/' },
  { name: 'Categories', url: '/categories/' },
  { name: 'Apps', url: '/apps/' },
  { name: 'About Me', url: '/about/' },
];

export const FooterLinks: NavigationLink[] = [
  { name: 'RSS', url: '/rss.xml' },
  { name: 'Gitea', url: 'https://gitea.alexlebens.dev' },
  { name: 'Docs', url: 'https://docs.alexlebens.dev' },
];

export const SEO = {
  title: global.name,
  description: global.about,
  structuredData: {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    inLanguage: 'en-US',
    '@id': global.site_url,
    url: global.site_url,
    name: global.name,
    description: global.about,
    isPartOf: {
      '@type': 'WebSite',
      url: global.site_url,
      name: global.name,
      description: global.about,
    },
  },
};
