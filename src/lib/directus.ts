import { createDirectus, rest } from '@directus/sdk';

import type {
  Global,
  Post,
  Application,
  Experience,
  Education,
  Certificate,
  Project,
  Skill,
} from '@lib/directusTypes';

import { getDirectusURL } from '@lib/directusFunctions';

type Schema = {
  site_global: Global;
  posts: Post[];
  site_applications: Application;
  site_experience: Experience;
  site_education: Education;
  site_certificate: Certificate;
  site_projects: Project;
  site_skills: Skill;
};

const directus = createDirectus<Schema>(getDirectusURL()).with(rest());

export default directus;
