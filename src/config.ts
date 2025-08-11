import { readSingleton } from '@directus/sdk';

import directus from '@lib/directus';

export interface NavigationLink {
  name: string;
  url: string;
}

const global = await directus.request(readSingleton('site_global'));

export const WorkInformation = [
  {
    name: 'Tech Startup',
    position: 'Junior Web Developer',
    location_type: 'On site',
    location: 'Auckland, New Zealand',
    url: 'https://techstartup.com',
    startDate: '2024-01-01',
    endDate: null,
    summary:
      'Developing and maintaining web applications using JavaScript, HTML, and CSS. Collaborating with the team to implement new features and fix bugs.',
    highlights: ['Improved website performance by optimizing code'],
    responsibilities: [
      'Collaborated with senior developers to design and implement web applications using modern JavaScript frameworks.',
      'Assisted in debugging and optimizing front-end code to ensure smooth user experiences.',
      'Participated in code reviews and contributed to improving coding standards within the team.',
    ],
    achievements: [
      'Developing and maintaining web applications using JavaScript, HTML, and CSS. Collaborating with the team to implement new features and fix bugs.',
    ],
    skills: ['React', 'Tailwind', 'GitHub'],
  },
];

export const NavigationLinks: NavigationLink[] = [
  { name: 'Home', url: '/' },
  { name: 'Blog', url: '/blog/' },
  { name: 'Categories', url: '/categories/' },
  { name: 'About Me', url: '/about/' },
];

export const FooterLinks: NavigationLink[] = [
  { name: 'RSS', url: '/rss.xml' },
  { name: 'Gitea', url: '/https://gitea.alexlebens.dev' },
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
