import rss from '@astrojs/rss';

import directus from "../../lib/directus"
import { readItems,readSingleton } from "@directus/sdk";

export async function GET(context: any) {
  const global = await directus.request(readSingleton("global"));
  const posts = await directus.request(
    readItems("posts", {
      fields: ['*'],
      sort: ["-published_date"],
    })
  );
  
  return rss({
    title: `${global.name}`,
    description: `${global.description}`,
    site: context.site,
    items: posts.map((post) => ({
      title: post.title,
      pubDate: post.published_date,
      description: post.slug,
      link: `/blog/${post.slug}/`,
      categories: post.tags || [],
    })),
  });
}
