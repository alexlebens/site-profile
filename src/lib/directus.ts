import { createDirectus, rest } from '@directus/sdk';

import type {
  Global,
  Weather,
  Post,
  Category,
  HeaderImage,
  Application,
  Experience,
  Education,
  Certificate,
  Project,
  Skill,
} from '@lib/directusTypes';

import { getDirectusURL } from '@/scripts/url';

type Schema = {
  site_global: Global;
  site_weather: Weather;
  posts: Post[];
  categories: Category[];
  header_images: HeaderImage[];
  site_applications: Application;
  site_experience: Experience;
  site_education: Education;
  site_certificate: Certificate;
  site_projects: Project;
  site_skills: Skill;
};

const directus = createDirectus<Schema>(getDirectusURL()).with(rest());

export default directus;
