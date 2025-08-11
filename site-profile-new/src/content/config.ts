import { defineCollection, z } from 'astro:content';

const categoryCollection = defineCollection({
  type: 'content',
  schema: () =>
    z.object({
      title: z.string(),
      description: z.string(),
    }),
});

export const collections = { categories: categoryCollection };
