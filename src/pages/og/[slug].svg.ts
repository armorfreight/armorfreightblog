import { getCollection } from 'astro:content';

export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map((post) => ({
    params: { slug: post.id },
    props: {
      title: post.data.title,
      description: post.data.description,
    },
  }));
}

export async function GET({ props }) {
  const title = props?.title || 'Armor Freight Journal';
  const description = props?.description || 'Operational perspective from the road, the dock, and the dispatch desk.';

  const safeTitle = title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const safeDescription = description.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
  <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-label="${safeTitle}">
    <defs>
      <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0%" stop-color="#0b0b0b"/>
        <stop offset="100%" stop-color="#1f2a1d"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="630" fill="url(#bg)"/>
    <rect x="64" y="64" width="164" height="164" rx="20" fill="#7db74e"/>
    <path d="M96 180l30-40 30 22 32-49 34 67z" fill="#0b0b0b" opacity="0.9"/>
    <path d="M113 152h93" stroke="#0b0b0b" stroke-width="8" stroke-linecap="round" opacity="0.9"/>
    <text x="64" y="286" fill="#7db74e" font-size="22" font-family="Arial, Helvetica, sans-serif" letter-spacing="6">ARMOR FREIGHT JOURNAL</text>
    <text x="64" y="382" fill="#ffffff" font-size="64" font-family="Arial, Helvetica, sans-serif" font-weight="700" style="font-family: Arial, sans-serif;">${safeTitle}</text>
    <text x="64" y="468" fill="#d7d7d0" font-size="26" font-family="Arial, Helvetica, sans-serif">${safeDescription}</text>
    <rect x="64" y="512" width="208" height="58" rx="12" fill="#7db74e"/>
    <text x="92" y="550" fill="#0b0b0b" font-size="24" font-family="Arial, Helvetica, sans-serif" font-weight="700">Read the Journal</text>
  </svg>`;

  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
