export type Global = {
  name: string;
  about: string;
  about_description: string;
  about_blog: string;
  about_categories: string;
  initials: string;
  email: string;
  site_url: string;
  logo: string;
  portrait: string;
  portrait_alt: string;
  home_image: string;
  home_image_alt: string;
  categories_image: string;
  categories_image_alt: string;
  blog_image: string;
  blog_image_alt: string;
  footer_image: string;
  footer_image_alt: string;
};

export type Post = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  category: string;
  selected: boolean;
  published: boolean;
  content: string;
  image: string;
  image_alt: string;
  image_second: string;
  image_second_alt: string;
  published_date: Date;
  updated_date: Date;
};

export type Experience = {
  id: string;
  name: string;
  location: string;
  location_type: string;
  url: string;
  startDate: string;
  endDate: string;
  position: string;
  summary: string;
  responsibilities: string[];
  highlights: string[];
  achievements: string[];
  skills: string[];
};

export type Education = {
  id: string;
  institution: string;
  url: string;
  area: string;
  studyType: string;
  graduationDate: string;
};

export type Certificate = {
  id: string;
  name: string;
  issuer: string;
  issuerDate: string;
  url: string;
};

export type Project = {
  id: string;
  name: string;
  isActive: boolean;
  description: string;
  highlights: string[];
  url: string;
  source: string;
};

export type Skill = {
  id: string;
  title: string;
  description: string;
  icon: string;
  level: string;
  date_created: string;
};
