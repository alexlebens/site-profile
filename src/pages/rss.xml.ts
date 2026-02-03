// From https://github.com/delucis/astro-blog-full-text-rss

import { getContainerRenderer as getMDXRenderer } from '@astrojs/mdx';
import rss, { type RSSFeedItem } from '@astrojs/rss';
import type { APIContext } from 'astro';
import { transform, walk } from 'ultrahtml';
import sanitize from 'ultrahtml/transformers/sanitize';
import { readItems, readSingleton } from '@directus/sdk';

import directus from '@lib/directus';

const global = await directus.request(readSingleton('site_global'));

export async function GET(context: APIContext) {
  let baseUrl = context.site?.href || global.site_url;
  if (baseUrl.at(-1) === '/') {
    baseUrl = baseUrl.slice(0, -1);
  }

  const posts = await directus.request(
    readItems('posts', {
      filter: { published: { _eq: true } },
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

  return rss({
    title: global.name,
    description: global.about,
    site: baseUrl,
    items: feedItems,
  });
}
