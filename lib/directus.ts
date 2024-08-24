import { createDirectus, rest, } from '@directus/sdk';

type Global = {
  title: string;
  description: string;
  name: string;
  tagline: string;
  email: string;
  portrait: string;
  about: string;
}

type About = {
  background: string;
  experience: string;
  education: string;
  certifications: string;
}

type Skills = {
    skill_1: string;
    skill_1_description: string;
    skill_2: string;
    skill_2_description: string;
    skill_3: string;
    skill_3_description: string;
  }

type Author = {
    name: string
}

export type Post = {
    slug: string;    
    title: string;
    content: string;
    image: string;
    published_date: string;
    author: Author;
    tags: string[];
    image_alt: string;
  }

type Schema = {
  global: Global;
  about: About;
  skills: Skills;
  posts: Post[];
}

export const directus_url = "https://directus.alexlebens.dev"

const directus = createDirectus<Schema>(directus_url).with(rest());

export default directus;
