// copy from https://github.com/delucis/astro-blog-full-text-rss
// see https://github.com/delucis/astro-blog-full-text-rss/blob/latest/src/pages/rss.xml.ts
// get more context

import { getContainerRenderer as getMDXRenderer } from '@astrojs/mdx';
import rss, { type RSSFeedItem } from '@astrojs/rss';
import type { APIContext } from 'astro';
import { transform, walk } from 'ultrahtml';
import sanitize from 'ultrahtml/transformers/sanitize';
import { readItems, readSingleton } from '@directus/sdk';

import directus from '@lib/directus';

const global = await directus.request(readSingleton('site_global'));

export async function GET(context: APIContext) {
  // Get the URL to prepend to relative site links. Based on `site` in `astro.config.mjs`.
  let baseUrl = context.site?.href || global.site_url;
  if (baseUrl.at(-1) === '/') {
    baseUrl = baseUrl.slice(0, -1);
  }

  // Load the content collection entries to add to our RSS feed.
  const posts = await directus.request(
    readItems('posts', {
      fields: ['*'],
      sort: ['-published_date'],
    })
  );

  const feedItems: RSSFeedItem[] = [];
  for (const post of posts) {
    const content = await transform(post.content.replace(/^<!DOCTYPE html>/, ''), [
      async (node) => {
        await walk(node, (node) => {
          if (node.name === 'a' && node.attributes.href?.startsWith('/')) {
            node.attributes.href = baseUrl + node.attributes.href;
          }
          if (node.name === 'img' && node.attributes.src?.startsWith('/')) {
            node.attributes.src = baseUrl + node.attributes.src;
          }
        });
        return node;
      },
      sanitize({ dropElements: ['script', 'style'] }),
    ]);
    feedItems.push({ ...post, link: `/blog/${post.slug}/`, content });
  }

  // Return our RSS feed XML response.
  return rss({
    title: global.name,
    description: global.about,
    site: baseUrl,
    items: feedItems,
  });
}
