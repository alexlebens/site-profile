import { createDirectus, rest } from '@directus/sdk';

type Global = {
  title: string;
  description: string;
  name: string;
  initals: string;
  tagline: string;
  email: string;
  portrait: string;
  portrait_alt: string;
  logo: string;
  about: string;
};

type About = {
  background: string;
  experience: string;
  education: string;
  certifications: string;
};

type Links = {
  github: string;
  linkedin: string;
  gitea: string;
};

type Skill = {
  title: string;
  description: string;
  icon: string;
  level: string;
};

export type Post = {
  slug: string;
  title: string;
  description: string;
  content: string;
  image: string;
  image_alt: string;
  published_date: Date;
  updated_date: Date;
  tags: string[];
};

type Schema = {
  global: Global;
  about: About;
  links: Links;
  skills: Skill[];
  posts: Post[];
};

const directus = createDirectus<Schema>(
  process.env.DIRECTUS_URL ?? 'https://directus.alexlebens.dev'
).with(rest());

export default directus;
